"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

/* ── Station type (lightweight — no Flutter dep) ────────────────── */
export interface RadioStationInfo {
  id: string;
  name: string;
  description: string;
  streamUrl: string;
  schedule: string;
}

/* ── Build station list from env vars ───────────────────────────── */
const STATIONS: RadioStationInfo[] = [
  {
    id: "station_1",
    name: "Asriel FM",
    description: "Daily teachings and worship",
    streamUrl: process.env.NEXT_PUBLIC_RADIO_STATION_1_URL || "",
    schedule: "Daily · 6:00 AM – 6:00 PM",
  },
  ...(process.env.NEXT_PUBLIC_RADIO_STATION_2_URL
    ? [
        {
          id: "station_2",
          name: "Asriel Night",
          description: "Night programs and special broadcasts",
          streamUrl: process.env.NEXT_PUBLIC_RADIO_STATION_2_URL,
          schedule: "Daily · 8:00 PM – Late",
        },
      ]
    : []),
];

/* ── Context shape ──────────────────────────────────────────────── */
interface RadioPlayerContextValue {
  stations: RadioStationInfo[];
  currentStation: RadioStationInfo | null;
  isPlaying: boolean;
  isBuffering: boolean;
  visible: boolean;
  play: (station?: RadioStationInfo) => void;
  pause: () => void;
  toggle: () => void;
  stop: () => void;
  setStation: (station: RadioStationInfo) => void;
}

const RadioPlayerContext = createContext<RadioPlayerContextValue | null>(null);

/* ── Hook ───────────────────────────────────────────────────────── */
export function useRadioPlayer(): RadioPlayerContextValue {
  const ctx = useContext(RadioPlayerContext);
  if (!ctx) {
    // Return a no-op default for SSR / outside provider
    return {
      stations: STATIONS,
      currentStation: null,
      isPlaying: false,
      isBuffering: false,
      visible: false,
      play: () => {},
      pause: () => {},
      toggle: () => {},
      stop: () => {},
      setStation: () => {},
    };
  }
  return ctx;
}

export function RadioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentStation, setCurrentStation] = useState<RadioStationInfo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [visible, setVisible] = useState(false);

  const play = useCallback((station?: RadioStationInfo) => {
    const target = station || currentStation || STATIONS[0];
    if (!target || !audioRef.current) return;

    if (!currentStation || currentStation.id !== target.id) {
      setCurrentStation(target);
      // We will let the audio tag src update via state before calling play
      setTimeout(() => {
        setIsBuffering(true);
        audioRef.current?.play().catch(console.error);
        setVisible(true);
      }, 50);
    } else {
      setIsBuffering(true);
      audioRef.current.play().catch(console.error);
      setVisible(true);
    }
  }, [currentStation]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentStation(null);
    setIsPlaying(false);
    setIsBuffering(false);
    setVisible(false);
  }, []);

  const setStation = useCallback((station: RadioStationInfo) => {
    setCurrentStation(station);
    if (isPlaying) {
      play(station);
    }
  }, [isPlaying, play]);

  return (
    <RadioPlayerContext.Provider
      value={{
        stations: STATIONS,
        currentStation,
        isPlaying,
        isBuffering,
        visible,
        play,
        pause,
        toggle,
        stop,
        setStation,
      }}
    >
      {/* Hidden audio element bound to state */}
      <audio
        ref={audioRef}
        src={currentStation?.streamUrl || undefined}
        onPlaying={() => {
          setIsPlaying(true);
          setIsBuffering(false);
        }}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setIsBuffering(true)}
        onCanPlay={() => setIsBuffering(false)}
        onError={() => {
          setIsPlaying(false);
          setIsBuffering(false);
        }}
      />
      {children}
    </RadioPlayerContext.Provider>
  );
}
