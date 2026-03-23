/**
 * Represents a single beat recorded by the user.
 */
interface Beat {
  /** Key pressed (e.g., "A", "S", etc.) */
  key: string;

  /** Timestamp in milliseconds when the key was pressed */
  timeStamp: number;
}

/**
 * Represents a full recording session.
 */
interface Recording {
  /** List of recorded beats */
  beats: Beat[];
}

/**
 * Represents the global application state.
 */
export interface ApplicationState {
  /**
   * Current mode of the application.
   *
   * - NORMAL → Idle state
   * - RECORDING_PROGRESS → Actively recording
   * - RECORDING_PAUSED → Recording paused
   * - PLAYBACK_PROGRESS → Playback in progress
   * - PLAYBACK_PAUSED → Playback paused
   */
  mode:
    | "NORMAL"
    | "RECORDING_PROGRESS"
    | "RECORDING_PAUSED"
    | "PLAYBACK_PROGRESS"
    | "PLAYBACK_PAUSED";

  /** Current recording data (null if no recording exists) */
  recordings: Recording | null;

  /** Last recorded timestamp (used for pause/resume calculations) */
  lastTimeStamp: number | null;

  /** Total accumulated pause duration during recording */
  pauseDuration: number;
}

/**
 * Represents all possible actions that can be dispatched to the reducer.
 */
type Action =
  /** Starts a new recording session */
  | { type: "START_RECORDING"; timeStamp: number }

  /** Stops the current recording session */
  | { type: "STOP_RECORDING" }

  /** Pauses an ongoing recording */
  | { type: "PAUSE_RECORDING"; timeStamp: number }

  /** Resumes a paused recording */
  | { type: "RESUME_RECORDING"; timeStamp: number }

  /** Starts playback of recorded beats */
  | { type: "START_PLAYBACK" }

  /** Pauses ongoing playback */
  | { type: "PAUSE_PLAYBACK" }

  /** Continues playback after pause */
  | { type: "CONTINUE_PLAYBACK" }

  /** Records a beat event */
  | { type: "BEAT"; key: string; timeStamp: number };

/**
 * Reducer function to manage application state transitions.
 *
 * Handles:
 * - Recording lifecycle (start, pause, resume, stop)
 * - Playback lifecycle (start, pause, resume)
 * - Beat recording with pause adjustment
 *
 * @param state - Current application state
 * @param action - Action to process
 * @returns Updated application state
 */
export function reducer(
  state: ApplicationState,
  action: Action
): ApplicationState {
  switch (action.type) {
    case "START_RECORDING":
      // Only allowed from NORMAL mode
      if (state.mode !== "NORMAL") return state;

      return {
        ...state,
        mode: "RECORDING_PROGRESS",
        recordings: { beats: [] },
        lastTimeStamp: action.timeStamp,
        pauseDuration: 0,
      };

    case "PAUSE_RECORDING":
      // Only allowed while recording
      if (state.mode !== "RECORDING_PROGRESS") return state;

      return {
        ...state,
        mode: "RECORDING_PAUSED",
        lastTimeStamp: action.timeStamp,
      };

    case "RESUME_RECORDING":
      // Only allowed if paused and timestamp exists
      if (
        state.mode !== "RECORDING_PAUSED" ||
        state.lastTimeStamp === null
      )
        return state;

      return {
        ...state,
        mode: "RECORDING_PROGRESS",
        pauseDuration:
          state.pauseDuration +
          (action.timeStamp - state.lastTimeStamp),
        lastTimeStamp: action.timeStamp,
      };

    case "STOP_RECORDING":
      // Only valid if a recording exists
      if (!state.recordings) return state;

      return {
        ...state,
        mode: "NORMAL",
        lastTimeStamp: null,
        pauseDuration: 0,
      };

    case "BEAT":
      // Only record beats during active recording
      if (
        state.mode !== "RECORDING_PROGRESS" ||
        !state.recordings
      )
        return state;

      // Adjust timestamp by removing pause duration
      const time = action.timeStamp - state.pauseDuration;

      return {
        ...state,
        recordings: {
          beats: [
            ...state.recordings.beats,
            {
              key: action.key,
              timeStamp: Math.max(0, time),
            },
          ],
        },
      };

    case "START_PLAYBACK":
      // Only allowed if recording exists and in NORMAL mode
      if (state.mode !== "NORMAL" || !state.recordings)
        return state;

      return {
        ...state,
        mode: "PLAYBACK_PROGRESS",
      };

    case "PAUSE_PLAYBACK":
      // Only allowed during playback
      if (state.mode !== "PLAYBACK_PROGRESS")
        return state;

      return {
        ...state,
        mode: "PLAYBACK_PAUSED",
      };

    case "CONTINUE_PLAYBACK":
      // Only allowed if playback is paused
      if (state.mode !== "PLAYBACK_PAUSED")
        return state;

      return {
        ...state,
        mode: "PLAYBACK_PROGRESS",
      };

    default:
      return state;
  }
}