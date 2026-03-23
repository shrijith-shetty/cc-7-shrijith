import { describe, it, expect } from "vitest";
import { reducer } from "./redux";
import type { ApplicationState } from "./redux";

// Starting state of the app
const initialState: ApplicationState = {
  mode: "NORMAL",
  recordings: null,
  lastTimeStamp: null,
  pauseDuration: 0,
};

describe("Reducer (Simple Tests)", () => {

  // 1. Start recording
  it("start recording", () => {
    const newState = reducer(initialState, {
      type: "START_RECORDING",
      timeStamp: 100,
    });

    expect(newState.mode).toBe("RECORDING_PROGRESS");
    expect(newState.recordings).toEqual({ beats: [] });
  });

  // 2. Add a beat
  it("add beat", () => {
    const recordingState = reducer(initialState, {
      type: "START_RECORDING",
      timeStamp: 100,
    });

    const newState = reducer(recordingState, {
      type: "BEAT",
      key: "a",
      timeStamp: 200,
    });

    expect(newState.recordings?.beats.length).toBe(1);
  });

  // 3. Pause recording
  it("pause recording", () => {
    const recordingState = reducer(initialState, {
      type: "START_RECORDING",
      timeStamp: 100,
    });

    const newState = reducer(recordingState, {
      type: "PAUSE_RECORDING",
      timeStamp: 200,
    });

    expect(newState.mode).toBe("RECORDING_PAUSED");
  });

  // 4. Resume recording
  it("resume recording", () => {
    const start = reducer(initialState, {
      type: "START_RECORDING",
      timeStamp: 100,
    });

    const pause = reducer(start, {
      type: "PAUSE_RECORDING",
      timeStamp: 200,
    });

    const resume = reducer(pause, {
      type: "RESUME_RECORDING",
      timeStamp: 300,
    });

    expect(resume.mode).toBe("RECORDING_PROGRESS");
    expect(resume.pauseDuration).toBe(100); // 300 - 200
  });

  // 5. Beat after pause (time fix)
  it("adjust beat time after pause", () => {
    const start = reducer(initialState, {
      type: "START_RECORDING",
      timeStamp: 100,
    });

    const pause = reducer(start, {
      type: "PAUSE_RECORDING",
      timeStamp: 200,
    });

    const resume = reducer(pause, {
      type: "RESUME_RECORDING",
      timeStamp: 300,
    });

    const newState = reducer(resume, {
      type: "BEAT",
      key: "a",
      timeStamp: 400,
    });

    // pause time = 100 → 400 - 100 = 300
    expect(newState.recordings?.beats[0].timeStamp).toBe(300);
  });

  // 6. Stop recording
  it("stop recording", () => {
    const start = reducer(initialState, {
      type: "START_RECORDING",
      timeStamp: 100,
    });

    const newState = reducer(start, {
      type: "STOP_RECORDING",
    });

    expect(newState.mode).toBe("NORMAL");
  });

  // 7. Start playback
  it("start playback", () => {
    const start = reducer(initialState, {
      type: "START_RECORDING",
      timeStamp: 100,
    });

    const stop = reducer(start, { type: "STOP_RECORDING" });

    const newState = reducer(stop, {
      type: "START_PLAYBACK",
    });

    expect(newState.mode).toBe("PLAYBACK_PROGRESS");
  });

  // 8. Pause playback
  it("pause playback", () => {
    const state: ApplicationState = {
      ...initialState,
      mode: "PLAYBACK_PROGRESS",
      recordings: { beats: [] },
    };

    const newState = reducer(state, {
      type: "PAUSE_PLAYBACK",
    });

    expect(newState.mode).toBe("PLAYBACK_PAUSED");
  });

  // 9. Continue playback
  it("continue playback", () => {
    const state: ApplicationState = {
      ...initialState,
      mode: "PLAYBACK_PAUSED",
      recordings: { beats: [] },
    };

    const newState = reducer(state, {
      type: "CONTINUE_PLAYBACK",
    });

    expect(newState.mode).toBe("PLAYBACK_PROGRESS");
  });

});