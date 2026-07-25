"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  ReactNode,
} from "react";

export interface RadioStationInfo {
  id: string;
  name: string;
  description: string;
  streamUrl: string;
  schedule: string;
}

const DEFAULT_STREAM_URL = process.env.NEXT_PUBLIC_RADIO_STATION_1_URL || "https://stream.zeno.fm/iy8v0envboitv";

const STATIONS: RadioStationInfo[] = [
  {
    id: "station_1",
    name: "Asriel Radio Live",
    description: "24/7 Prophetic Teachings & Worship",
    streamUrl: DEFAULT_STREAM_URL,
    schedule: "Daily · 24 Hours",
  },
];

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

export function useRadioPlayer(): RadioPlayerContextValue {
  const ctx = useContext(RadioPlayerContext);
  if (!ctx) {
    return {
      stations: STATIONS,
      currentStation: STATIONS[0],
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
  const [currentStation, setCurrentStation] = useState<RadioStationInfo>(STATIONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [visible, setVisible] = useState(false);

  const play = useCallback((station?: RadioStationInfo) => {
    const target = station || currentStation || STATIONS[0];
    setCurrentStation(target);
    setVisible(true);

    const audio = audioRef.current;
    if (!audio) return;

    const targetUrl = target.streamUrl || DEFAULT_STREAM_URL;

    // Set audio source synchronously for instant browser click-to-play compliance
    if (audio.src !== targetUrl) {
      audio.src = targetUrl;
    }

    setIsBuffering(true);
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsBuffering(false);
        })
        .catch((err) => {
          console.error("Audio playback error:", err);
          setIsPlaying(false);
          setIsBuffering(false);
        });
    }
  }, [currentStation]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
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
      {/* HTML5 Audio Stream element */}
      <audio
        ref={audioRef}
        src={currentStation?.streamUrl || DEFAULT_STREAM_URL}
        preload="none"
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
