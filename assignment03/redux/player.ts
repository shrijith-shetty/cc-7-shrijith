/**
 * Represents a single recorded beat.
 */
type Beat = {
  /** Key pressed (e.g., "A", "S", or "PAUSED") */
  key: string;

  /** Timestamp in milliseconds */
  timestamp: number;
};

/**
 * Represents a recording after normalization.
 */
type Recording = {
  /** Array of normalized beats (pause gaps removed) */
  normalizedBeats: Beat[];
};

/**
 * Listener callback for playback updates.
 *
 * @param beatIndex - Current beat index being played
 * @param totalBeats - Total number of beats
 * @param isFinished - Indicates whether playback has completed
 */
type Listener = (
  beatIndex: number,
  totalBeats: number,
  isFinished: boolean,
) => void;

/**
 * Type helper for setTimeout return value.
 */
type Timeout = ReturnType<typeof setTimeout>;

/**
 * Player class handles playback of recorded beats.
 *
 * Features:
 * - Play / Pause functionality
 * - Beat normalization (removes pause gaps)
 * - Listener subscription for playback progress
 */
export class Player {
  /**
   * Set of subscribed listeners.
   */
  private listeners = new Set<Listener>();

  /**
   * Active timers for scheduled playback.
   */
  private scheduledPlaybackTimers: Timeout[] = [];

  /**
   * Current beat index.
   */
  private beatIndex = 0;

  /**
   * Indicates if playback is active.
   */
  private isPlaying = false;

  /**
   * Current recording data.
   */
  private recording: Recording = { normalizedBeats: [] };

  /**
   * Playback handler function (injected externally).
   */
  private playback: (key: string) => void = () => {};

  /**
   * Total number of beats in the recording.
   */
  get totalBeats() {
    return this.recording.normalizedBeats.length;
  }

  /**
   * Initializes the player with a recording and playback handler.
   *
   * @param recording - Recording data
   * @param playback - Function to play a key sound
   */
  init(recording: Recording, playback: (key: string) => void) {
    this.recording = recording;
    this.playback = playback;
  }

  /**
   * Subscribes to playback updates.
   *
   * @param listener - Callback function for updates
   */
  subscribe(listener: Listener) {
    this.listeners.add(listener);
  }

  /**
   * Unsubscribes from playback updates.
   *
   * @param listener - Listener to remove
   */
  unsubscribe(listener: Listener) {
    this.listeners.delete(listener);
  }

  /**
   * Normalizes beats by removing paused durations.
   *
   * Example:
   * If pauses exist between timestamps, those gaps are removed
   * so playback appears continuous.
   *
   * @param rawBeats - Original recorded beats
   * @returns Normalized beats
   */
  private normalizeBeats(rawBeats: Beat[]): Beat[] {
    let totalPausedTime = 0;
    let pauseStart: number | null = null;

    return rawBeats.reduce((result: Beat[], beat) => {
      // Detect pause start
      if (beat.key === "PAUSED") {
        if (pauseStart === null) {
          pauseStart = beat.timestamp;
        }
        return result;
      }

      // Calculate paused duration
      if (pauseStart !== null) {
        totalPausedTime += beat.timestamp - pauseStart;
        pauseStart = null;
      }

      // Adjust timestamp
      result.push({
        key: beat.key,
        timestamp: beat.timestamp - totalPausedTime,
      });

      return result;
    }, []);
  }

  /**
   * Starts playback of the recording.
   *
   * - Prevents duplicate playback
   * - Normalizes beats before playing
   * - Schedules beats using setTimeout
   * - Notifies listeners during playback
   * - Sends completion notification when finished
   */
  play() {
    if (this.isPlaying) return;

    const normalizedBeats = this.normalizeBeats(this.recording.normalizedBeats);
    if (normalizedBeats.length === 0) return;

    this.isPlaying = true;

    const startTime = normalizedBeats[this.beatIndex]?.timestamp ?? 0;

    for (let i = this.beatIndex; i < normalizedBeats.length; i++) {
      const beat = normalizedBeats[i];
      const delay = beat.timestamp - startTime;

      const timer = setTimeout(() => {
        this.playback(beat.key);

        this.beatIndex = i + 1;

        this.notify();

        if (this.beatIndex === normalizedBeats.length) {
          this.isPlaying = false;
          this.notify(true);
        }
      }, delay);

      this.scheduledPlaybackTimers.push(timer);
    }
  }

  /**
   * Pauses playback.
   *
   * - Clears all scheduled timers
   * - Stops playback immediately
   */
  pause() {
    this.scheduledPlaybackTimers.forEach(clearTimeout);
    this.scheduledPlaybackTimers = [];
    this.isPlaying = false;
  }

  /**
   * Example state used for testing/demo purposes.
   */
  state = {
    mode: "RECORDING_PAUSED",
    recording: {
      normalizedBeats: [
        { key: "B", timestamp: 1500 },
        { key: "S", timestamp: 2000 },
        { key: "D", timestamp: 3000 },
        { key: "PAUSED", timestamp: 4000 },
        { key: "PAUSED", timestamp: 7000 },
        { key: "A", timestamp: 7500 },
        { key: "PAUSED", timestamp: 8000 },
        { key: "L", timestamp: 10000 },
      ],
    },
  };

  /**
   * Notifies all subscribed listeners about playback progress.
   *
   * @param isFinished - Whether playback has completed
   */
  notify(isFinished = false) {
    this.listeners.forEach((l) =>
      l(this.beatIndex, this.totalBeats, isFinished),
    );
  }
}
