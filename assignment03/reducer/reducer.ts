/**
 * Represents a single beat recorded by the user.
 */
export type Beat = {
  /** Key pressed (e.g., "A", "S") */
  key: string;

  /** Timestamp (in ms) when the key was pressed */
  timeStamp: number;
};

/**
 * Represents a recording session containing multiple beats.
 */
export type Recording = {
  /** List of recorded beats */
  beat: Beat[];
};

/**
 * Represents the complete application state.
 */
export type States = {
  /**
   * Current mode of the application.
   *
   * - NORMAL → Idle state
   * - RECORDING_PROGRESS → Recording is active
   * - RECORDING_PAUSED → Recording is paused
   * - PLAYBACK_PROGRESS → Playback is running
   * - PLAYBACK_PAUSE → Playback is paused
   */
  mode:
    | "NORMAL"
    | "RECORDING_PROGRESS"
    | "RECORDING_PAUSED"
    | "PLAYBACK_PROGRESS"
    | "PLAYBACK_PAUSE";

  /** Current recording data (null if no recording exists) */
  recording: Recording | null;

  /**
   * Last timestamp used for pause/resume calculations.
   * Helps in tracking how long recording was paused.
   */
  lastTimestamp: number | null;

  /**
   * Total accumulated pause duration.
   * Used to adjust beat timestamps so pauses are removed.
   */
  pausedDuration: number;
};

/**
 * Represents all possible actions that can update the state.
 */
export type ActionStates =
  /** Start a new recording */
  | { action: "START_RECORDING"; timestamp: number }

  /** Stop recording */
  | { action: "STOP_RECORDING" }

  /** Pause recording */
  | { action: "PAUSE_RECORDING"; timestamp: number }

  /** Continue recording after pause */
  | { action: "CONTINUE_RECORDING"; timestamp: number }

  /** Start playback */
  | { action: "START_PLAYBACK" }

  /** Pause playback */
  | { action: "PAUSE_PLAYBACK" }

  /** Continue playback */
  | { action: "CONTINUE_PLAYBACK"; timestamp: number }

  /** Record a beat */
  | { action: "BEAT"; key: string; timestamp: number };

/**
 * Reducer function to manage application state.
 *
 * Handles:
 * - Recording lifecycle (start, pause, resume, stop)
 * - Playback lifecycle (start, pause, resume)
 * - Beat recording with pause adjustment
 *
 * @param state - Current application state
 * @param actions - Action to perform
 * @returns Updated state
 */
export const progression = (state: States, actions: ActionStates): States => {
  switch (actions.action) {
    /**
     * Start recording from NORMAL mode.
     * Initializes recording and resets pause duration.
     */
    case "START_RECORDING": {
      if (state.mode === "NORMAL") {
        return {
          ...state,
          mode: "RECORDING_PROGRESS",
          recording: { beat: [] },
          lastTimestamp: actions.timestamp,
          pausedDuration: 0,
        };
      }
      return state;
    }

    /**
     * Stop recording and reset to NORMAL mode.
     */
    case "STOP_RECORDING": {
      if (state.mode === "RECORDING_PROGRESS") {
        return {
          ...state,
          mode: "NORMAL",
          lastTimestamp: null,
          pausedDuration: 0,
        };
      }
      return state;
    }

    /**
     * Pause recording.
     * Stores the timestamp to calculate pause duration later.
     */
    case "PAUSE_RECORDING": {
      if (state.mode === "RECORDING_PROGRESS") {
        return {
          ...state,
          mode: "RECORDING_PAUSED",
          lastTimestamp: actions.timestamp,
        };
      }
      return state;
    }

    /**
     * Continue recording after pause.
     * Adds paused time to total pause duration.
     */
    case "CONTINUE_RECORDING": {
      if (state.mode === "RECORDING_PAUSED" && state.lastTimestamp !== null) {
        return {
          ...state,
          mode: "RECORDING_PROGRESS",
          pausedDuration:
            state.pausedDuration + (actions.timestamp - state.lastTimestamp),
          lastTimestamp: actions.timestamp,
        };
      }
      return state;
    }

    /**
     * Record a beat.
     * Adjusts timestamp by removing pause duration.
     */
    case "BEAT": {
      if (
        state.mode === "RECORDING_PROGRESS" &&
        state.recording &&
        state.lastTimestamp !== null &&
        actions.key.trim() !== ""
      ) {
        const adjustedTime = actions.timestamp - state.pausedDuration;

        return {
          ...state,
          recording: {
            beat: [
              ...state.recording.beat,
              {
                key: actions.key,
                timeStamp: Math.max(0, adjustedTime),
              },
            ],
          },
        };
      }
      return state;
    }

    /**
     * Start playback if recording exists.
     */
    case "START_PLAYBACK": {
      if (state.mode === "NORMAL" && state.recording) {
        return {
          ...state,
          mode: "PLAYBACK_PROGRESS",
        };
      }
      return state;
    }

    /**
     * Pause playback.
     */
    case "PAUSE_PLAYBACK": {
      if (state.mode === "PLAYBACK_PROGRESS") {
        return {
          ...state,
          mode: "PLAYBACK_PAUSE",
        };
      }
      return state;
    }

    /**
     * Continue playback after pause.
     */
    case "CONTINUE_PLAYBACK": {
      if (state.mode === "PLAYBACK_PAUSE") {
        return {
          ...state,
          mode: "PLAYBACK_PROGRESS",
        };
      }
      return state;
    }

    /**
     * Default case returns current state unchanged.
     */
    default:
      return state;
  }
};
