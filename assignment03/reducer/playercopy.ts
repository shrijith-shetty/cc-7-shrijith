import { time, timeStamp } from "node:console";

type Beat = { key: string; timestamp: number };
type Recording = { beats: Beat[] };
type Listener = (beatIndex: number, totalBeats: number) => void;

type Timeout = ReturnType<typeof setTimeout>; // ReturnType helps you to derive the return type of a function.

class Player {
  listeners: Listener[] = [];
  sheduledPlaybackTimers: Timeout[] = [];

  beatIndex: number = 0;

  // ❗ declare explicitly (instead of parameter property)
  private recording: Recording;
  private playback: (beat: Beat) => void;

  get totalBeats() {
    return this.recording.beats.length;
  }

  constructor(recording: Recording, playback: (beat: Beat) => void) {
    this.recording = recording;
    this.playback = playback;
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  setRecording(recording: Recording, playFn: (beat: Beat) => void) {
    // this.recording = recording;
    // this.playFunction = playFn;
    // this.index = 0;
  }
  notify() {}

  normalise(recording: Beat[], startIndex: number) {
    if (recording.length <= startIndex) return [];
    let pauseValue = 0;

    let startTime = recording[startIndex].timestamp;

    // const beet: Beat[] = recording
    //   .filter((l, index) => {
    //     if (l.key === "PAUSE") {
    //       pauseValue = l.timestamp;
    //       return false;
    //     }
    //     if (!(index < startIndex)) {
    //       return true;
    //     }
    //     return false;
    //   })
    //   .map((l) => {
    //     if (pauseValue !== 0 && l.key !== "PAUSE" && beet !== undefined) {
    //       return {
    //         key: l.key,
    //         timeStamp:
    //           beet[beet.length - 1].timestamp +
    //           (pauseValue - beet[beet.length - 1].timestamp),
    //       };
    //       pauseValue = 0;
    //     } else
    //       return {
    //         key: l.key,
    //         timestamp: l.timestamp - startTime,
    //       };
    //   });

    return beet;
  }

  normalize(beat: Beat[], currentIndex: number): Beat[] {
    let record: Beat[] = [];
    let pauseTime = 0;

    if (beat.length <= currentIndex) return [];

    let startTime = beat[currentIndex].timestamp;

    for (let i = currentIndex; i < beat.length; i++) {
      const curr = beat[i];

      if (curr.key === "PAUSE") {
        pauseTime = curr.timestamp;
        continue;
      }

      let time = curr.timestamp - startTime;

      if (pauseTime !== 0 && record.length > 0) {
        const last = record[record.length - 1];
        time = last.timestamp + (curr.timestamp - pauseTime);
        pauseTime = 0;
      }

      record.push({
        key: curr.key,
        timestamp: time,
      });
    }
    return record;
  }

  play() {
    // Should normalise the beats, and setup playback timers
    // 1. normalise beats
    //this.normaliseBeats(this.beats);
    // 2. Create timers for all beats from beat starting current beat index onwards
    // in the timer callback, to play the beat, call `playback` that was passed in constructor.
    this.normalize(beat, 0);
    const beats = beat;

    if (beats.length === 0) return;

    const startTime = beats[0].timestamp;

    const normalisedBeats = beats.map((b) => ({
      key: b.key,
      timestamp: b.timestamp - startTime,
    }));

    return normalisedBeats;
  }

  pause() {
    // We need to clear all the timers in sheduledPlaybackTimers.
  }
}

const beat: Beat[] = [
  { key: "A", timestamp: Date.now() },
  { key: "F", timestamp: Date.now() + 2000 },
  { key: "PAUSE", timestamp: Date.now() + 3000 },
  { key: "D", timestamp: Date.now() + 5000 },
  { key: "PAUSE", timestamp: Date.now() + 6000 },
  { key: "D", timestamp: Date.now() + 8000 },
];

const play = new Player({ beats: beat }, (b) => console.log("Playing:", b.key));
const beet: Beat[] | undefined = play.normalize(beat, 1);

beet.forEach((b) => {
  console.log(`${b.key}\t ${b.timestamp}`);
});

// play.normalise(beat, 1);

// const normalization = (beats: Beat[], currentBeatIndex: number) => {};

// const play = () => {
//   let record: Beat[] = [];
//   let startTime = 0;
//   beat.map((beginTime, index) => {
//     if (index === 0 && beginTime.timeStamp > 0) {
//       startTime = beginTime.timeStamp;
//     }

//     const newBeat = {
//       key: beginTime.key,
//       timeStamp: beginTime.timeStamp - startTime,
//     };

//     record.push(newBeat);

//     console.log(`${newBeat.key}\t ${newBeat.timeStamp}\n`);
//   });
// };

// play();
