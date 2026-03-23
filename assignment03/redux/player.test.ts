import { describe, it, expect, vi, beforeEach } from "vitest";
import { Player } from "./player";

type Beat = { key: string; timestamp: number };
type Recording = { beats: Beat[] };

describe("Player", () => {
  let player: any;
  let playbackMock: any;
  const recording: Recording = {
    beats: [
      { key: "B", timestamp: 1000 },
      { key: "S", timestamp: 2000 },
      { key: "PAUSED", timestamp: 3000 },
      { key: "PAUSED", timestamp: 5000 },
      { key: "A", timestamp: 6000 },
    ],
  };
  beforeEach(() => {
    vi.useFakeTimers();
    playbackMock = vi.fn();

    player = new Player();
    player.init(recording, playbackMock);
  });

  it("plays beats in correct order without pause", () => {
    player.play();

    vi.runAllTimers();

    expect(playbackMock).toHaveBeenCalledTimes(3);
    expect(playbackMock).toHaveBeenCalledWith("B");
    expect(playbackMock).toHaveBeenCalledWith("S");
    expect(playbackMock).toHaveBeenCalledWith("A");
  });

  it("Notifier listener on each beat", () => {
    // Notifying listener

    const listener = vi.fn();

    player.subscribe(listener);

    player.subscribe(listener);

    player.play();
    vi.runAllTimers();

    expect(listener).toHaveBeenCalled();
    expect(listener).toHaveBeenCalledWith(1, 5);
  });
  it("pauses playback correctly", () => {
    player.play();
    player.pause();
    vi.runAllTimers();

    expect(playbackMock).not.toHaveBeenCalled();
  });

  it("unsubscribe removes listener", () => {
    player.play();
    player.play();

    vi.runAllTimers();

    expect(playbackMock).toHaveBeenCalledTimes(3);
  });
  it("normalizes beats by removing paused time", () => {
    const player = new Player();

    const rawBeats = [
      { key: "A", timestamp: 1000 },
      { key: "PAUSED", timestamp: 2000 },
      { key: "PAUSED", timestamp: 4000 },
      { key: "B", timestamp: 5000 },
    ];

    // access private method (test trick)
    const normalized = (player as any).normalizeBeats(rawBeats);

    expect(normalized).toEqual([
      { key: "A", timestamp: 1000 },
      { key: "B", timestamp: 3000 }, // 5000 - 2000 pause
    ]);
  });
  it("notifies when playback finishes", () => {
  const listener = vi.fn();

  player.subscribe(listener);

  player.play();
  vi.runAllTimers();

  expect(listener).toHaveBeenLastCalledWith(3, 5, true);
});
});
