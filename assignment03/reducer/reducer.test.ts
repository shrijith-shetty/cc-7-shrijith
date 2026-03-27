import { describe, it, expect } from "vitest";
import { progression, type States } from "./reducer";


const initialState: States = {
  mode: "NORMAL",
  recording: null,
  lastTimestamp: null,
  pausedDuration: 0,
};

describe("Reducer (Simple Tests)", () => {
  it("start recording", () => {
    const newState = progression(initialState, {
      action: "START_RECORDING",
      timestamp: 100,
    });

    expect(newState.mode).toBe("RECORDING_PROGRESS");
    expect(newState.recording).toEqual({ beat: [] });
  });

  it("add beat", () => {
    const start = progression(initialState, {
      action: "START_RECORDING",
      timestamp: 100,
    });

    const newState = progression(start, {
      action: "BEAT",
      key: "a",
      timestamp: 200,
    });

    expect(newState.recording?.beat.length).toBe(1);
  });

  it("pause recording", () => {
    const start = progression(initialState, {
      action: "START_RECORDING",
      timestamp: 100,
    });

    const newState = progression(start, {
      action: "PAUSE_RECORDING",
      timestamp: 200,
    });

    expect(newState.mode).toBe("RECORDING_PAUSED");
  });

  it("continue recording", () => {
    const start = progression(initialState, {
      action: "START_RECORDING",
      timestamp: 100,
    });

    const pause = progression(start, {
      action: "PAUSE_RECORDING",
      timestamp: 200,
    });

    const resume = progression(pause, {
      action: "CONTINUE_RECORDING",
      timestamp: 300,
    });

    expect(resume.mode).toBe("RECORDING_PROGRESS");
    expect(resume.pausedDuration).toBe(100);
  });

  it("adjust beat time after pause", () => {
    const start = progression(initialState, {
      action: "START_RECORDING",
      timestamp: 100,
    });

    const pause = progression(start, {
      action: "PAUSE_RECORDING",
      timestamp: 200,
    });

    const resume = progression(pause, {
      action: "CONTINUE_RECORDING",
      timestamp: 300,
    });

    const newState = progression(resume, {
      action: "BEAT",
      key: "a",
      timestamp: 400,
    });

    expect(newState.recording?.beat[0].timeStamp).toBe(300);
  });

  it("stop recording", () => {
    const start = progression(initialState, {
      action: "START_RECORDING",
      timestamp: 100,
    });

    const newState = progression(start, {
      action: "STOP_RECORDING",
    });

    expect(newState.mode).toBe("NORMAL");
  });

  it("start playback", () => {
    const start = progression(initialState, {
      action: "START_RECORDING",
      timestamp: 100,
    });

    const stop = progression(start, {
      action: "STOP_RECORDING",
    });

    const newState = progression(stop, {
      action: "START_PLAYBACK",
    });

    expect(newState.mode).toBe("PLAYBACK_PROGRESS");
  });

  it("pause playback", () => {
    const state: States = {
      ...initialState,
      mode: "PLAYBACK_PROGRESS",
      recording: { beat: [] },
    };

    const newState = progression(state, {
      action: "PAUSE_PLAYBACK",
    });

    expect(newState.mode).toBe("PLAYBACK_PAUSE");
  });

  it("continue playback", () => {
    const state: States = {
      ...initialState,
      mode: "PLAYBACK_PAUSE",
      recording: { beat: [] },
    };

    const newState = progression(state, {
      action: "CONTINUE_PLAYBACK",
      timestamp: 0,
    });

    expect(newState.mode).toBe("PLAYBACK_PROGRESS");
  });
});
