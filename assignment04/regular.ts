// Represents a single input event
type Beat = {
  key: string;
  timestamp: number;
};

// Stores all recorded beats
type Recording = {
  beats: Beat[];
};

// Possible states of the app
type Mode =
  | "NORMAL"
  | "RECORDING_PROGRESS"
  | "RECORDING_PAUSED"
  | "PLAYBACK_PROGRESS"
  | "PLAYBACK_PAUSED";

// Full application state
type ApplicationState = {
  mode: Mode;
  recordings: Recording;
};

// All supported actions
type Action =
  | { type: "START_RECORDING"; time: number }
  | { type: "STOP_RECORDING" }
  | { type: "PAUSE_RECORDING"; time: number }
  | { type: "RESUME_RECORDING"; time: number }
  | { type: "START_PLAYBACK" }
  | { type: "STOP_PLAYBACK" }
  | { type: "PAUSE_PLAYBACK" }
  | { type: "RESUME_PLAYBACK" }
  | { type: "ADD_BEAT"; beats: Beat[] };

// Lightweight store
function createStore<S, A>(
  initialState: S,
  reducer: (state: S, action: A) => S,
) {
  let current = initialState;

  return {
    dispatch(action: A) {
      current = reducer(current, action);
    },
    getState() {
      return current;
    },
  };
}

// Helper to check allowed transitions
const is = (current: Mode, expected: Mode) => current === expected;

// Reducer logic
function reducer(state: ApplicationState, action: Action): ApplicationState {
  const { mode, recordings } = state;

  switch (action.type) {
    case "START_RECORDING":
      return is(mode, "NORMAL")
        ? { ...state, mode: "RECORDING_PROGRESS" }
        : state;

    case "STOP_RECORDING":
      return is(mode, "RECORDING_PROGRESS")
        ? { ...state, mode: "NORMAL" }
        : state;

    case "PAUSE_RECORDING":
      return is(mode, "RECORDING_PROGRESS")
        ? { ...state, mode: "RECORDING_PAUSED" }
        : state;

    case "RESUME_RECORDING":
      return is(mode, "RECORDING_PAUSED")
        ? { ...state, mode: "RECORDING_PROGRESS" }
        : state;

    case "START_PLAYBACK":
      return is(mode, "NORMAL")
        ? { ...state, mode: "PLAYBACK_PROGRESS" }
        : state;

    case "STOP_PLAYBACK":
      return is(mode, "PLAYBACK_PROGRESS")
        ? { ...state, mode: "NORMAL" }
        : state;

    case "PAUSE_PLAYBACK":
      return is(mode, "PLAYBACK_PROGRESS")
        ? { ...state, mode: "PLAYBACK_PAUSED" }
        : state;

    case "RESUME_PLAYBACK":
      return is(mode, "PLAYBACK_PAUSED")
        ? { ...state, mode: "PLAYBACK_PROGRESS" }
        : state;

    case "ADD_BEAT":
      return is(mode, "RECORDING_PROGRESS")
        ? {
            ...state,
            recordings: {
              ...recordings,
              beats: [...recordings.beats, ...action.beats],
            },
          }
        : state;

    default:
      return state;
  }
}

export { createStore, reducer, type ApplicationState };
