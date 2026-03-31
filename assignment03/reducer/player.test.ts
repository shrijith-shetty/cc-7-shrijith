import { describe, it, expect, vi, beforeEach } from "vitest";
import { Player } from "./player";

type Beat = { key: string; timeStamp: number };
type Recording = { beat: Beat[] };

describe("Player", () => {
  let player: any;
  let playMock: any;

  const recording: Recording = {
    beat: [
      { key: "B", timeStamp: 1000 },
      { key: "S", timeStamp: 2000 },
      { key: "A", timeStamp: 3000 },
    ],
  };

  beforeEach(() => {
    vi.useFakeTimers();

    playMock = vi.fn();

    player = new Player();
    player.setRecording(recording, playMock);
  });

  it("plays beats in correct order", () => {
    player.play();

    vi.runAllTimers();

    expect(playMock).toHaveBeenCalledTimes(3);
    expect(playMock).toHaveBeenNthCalledWith(1, { key: "B", timeStamp: 1000 });
    expect(playMock).toHaveBeenNthCalledWith(2, { key: "S", timeStamp: 2000 });
    expect(playMock).toHaveBeenNthCalledWith(3, { key: "A", timeStamp: 3000 });
  });

  it("pause stops playback", () => {
    player.play();
    player.pause();

    vi.runAllTimers();

    expect(playMock).not.toHaveBeenCalled();
  });

  it("stop resets index", () => {
    player.play();
    player.stop();

    expect(player.index).toBe(0);
  });

  it("plays from current index after pause", () => {
    player.play();

    // run first beat only
    vi.advanceTimersByTime(1000);

    player.pause();

    player.play();
    vi.runAllTimers();

    expect(playMock).toHaveBeenCalledTimes(3);
  });

  it("does nothing if no recording", () => {
    const p = new Player();
    p.play();

    expect(playMock).not.toHaveBeenCalled();
  });
});
