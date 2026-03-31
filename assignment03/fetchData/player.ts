// /**
//  * Represents a single beat.
//  */
// export type Beat1 = {
//   /** Key pressed (e.g., "A", "S") */
//   key: string;

//   /** Time when the key was pressed */
//   timeStamp: number;
// };

// /**
//  * Represents a recording session.
//  */
// export type Recording1 = {
//   /** List of recorded beats */
//   beat: Beat[];
// };

// /**
//  * Player class handles playback of recorded beats.
//  *
//  * Features:
//  * - Play beats in order
//  * - Pause playback
//  * - Stop playback
//  */
// export class Player1 {
//   /** Current recording data */
//   recording: Recording | null = null;

//   /** Function to play each beat */
//   playFunction: ((beat: Beat) => void) | null = null;

//   /** List of active timers */
//   timers: any[] = [];

//   /** Current index of playback */
//   index: number = 0;

//   /**
//    * Set recording and play function.
//    *
//    * @param recording - Recording data
//    * @param playFn - Function to execute each beat
//    */
//   setRecording(recording: Recording, playFn: (beat: Beat) => void) {
//     this.recording = recording;
//     this.playFunction = playFn;
//     this.index = 0;
//   }

//   /**
//    * Starts or resumes playback.
//    */
//   play() {
//     if (!this.recording) return;
//     if (!this.playFunction) return;

//     let beats = this.recording.beat;

//     if (beats.length === 0) return;

//     this.clearTimers();

//     let prevTime = 0;

//     // If resuming, get previous beat time
//     if (this.index > 0) {
//       prevTime = beats[this.index - 1].timeStamp;
//     }

//     const playNext = (i: number) => {
//       // Stop if all beats are played
//       if (i >= beats.length) {
//         return;
//       }

//       let currentBeat = beats[i];

//       // Calculate delay between beats
//       let delay = currentBeat.timeStamp - prevTime;
//       if (delay < 0) delay = 0;

//       prevTime = currentBeat.timeStamp;

//       let t = setTimeout(() => {
//         if (this.playFunction) {
//           this.playFunction(currentBeat);
//         }

//         // Move to next beat
//         this.index = this.index + 1;

//         playNext(i + 1);
//       }, delay);

//       this.timers.push(t);
//     };

//     playNext(this.index);
//   }

//   /**
//    * Pauses playback by clearing all timers.
//    */
//   pause() {
//     this.clearTimers();
//   }

//   /**
//    * Stops playback and resets position.
//    */
//   stop() {
//     this.clearTimers();
//     this.index = 0;
//   }

//   /**
//    * Clears all active timers.
//    */
//   clearTimers() {
//     for (let i = 0; i < this.timers.length; i++) {
//       clearTimeout(this.timers[i]);
//     }
//     this.timers = [];
//   }
// }
