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

/* ── Provider ───────────────────────────────────────────────────── */
export function RadioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentStation, setCurrentStation] = useState<RadioStationInfo | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [visible, setVisible] = useState(false);

  // Create audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";

    audio.addEventListener("playing", () => {
      setIsPlaying(true);
      setIsBuffering(false);
    });
    audio.addEventListener("pause", () => setIsPlaying(false));
    audio.addEventListener("waiting", () => setIsBuffering(true));
    audio.addEventListener("canplay", () => setIsBuffering(false));
    audio.addEventListener("error", () => {
      setIsPlaying(false);
      setIsBuffering(false);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audio.load();
    };
  }, []);

  const play = useCallback(
    (station?: RadioStationInfo) => {
      const target = station || currentStation || STATIONS[0];
      if (!target || !audioRef.current) return;

      const audio = audioRef.current;

      // If switching station, update source
      if (!currentStation || currentStation.id !== target.id) {
        setCurrentStation(target);
        audio.src = target.streamUrl;
      }

      setVisible(true);
      setIsBuffering(true);
      audio.play().catch(() => {
        setIsBuffering(false);
      });
    },
    [currentStation]
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = "";
      audio.load();
    }
    setCurrentStation(null);
    setIsPlaying(false);
    setIsBuffering(false);
    setVisible(false);
  }, []);

  const setStation = useCallback(
    (station: RadioStationInfo) => {
      setCurrentStation(station);
      if (isPlaying) {
        play(station);
      }
    },
    [isPlaying, play]
  );

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
      {children}
    </RadioPlayerContext.Provider>
  );
}
