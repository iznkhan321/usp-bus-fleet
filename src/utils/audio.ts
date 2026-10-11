/**
 * Web Audio API synthesizer for Proximity Alarm Tones
 * Does not require external audio assets - runs natively in any modern browser.
 */

export function playAlarmTone(toneName: 'Loud Chime' | 'Subtle Pulse' | 'Siren Alert' | 'Campus Bell') {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (toneName === 'Loud Chime') {
      // Pleasant bright two-tone chime
      const now = ctx.currentTime;
      [
        { freq: 659.25, time: now, dur: 0.25 }, // E5
        { freq: 880.00, time: now + 0.15, dur: 0.35 }, // A5
        { freq: 1046.50, time: now + 0.32, dur: 0.5 } // C6
      ].forEach(({ freq, time, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.3, time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + dur);
      });
    } else if (toneName === 'Subtle Pulse') {
      const now = ctx.currentTime;
      [0, 0.2, 0.4].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, now + offset); // D5
        gain.gain.setValueAtTime(0, now + offset);
        gain.gain.linearRampToValueAtTime(0.18, now + offset + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.16);
      });
    } else if (toneName === 'Siren Alert') {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.linearRampToValueAtTime(950, now + 0.25);
      osc.frequency.linearRampToValueAtTime(750, now + 0.5);
      osc.frequency.linearRampToValueAtTime(950, now + 0.75);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.85);
    } else {
      // Campus Bell
      const now = ctx.currentTime;
      const fundamental = 523.25; // C5
      [1, 2, 2.76, 4.07].forEach((partial, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamental * partial, now);

        const decay = 0.9 / (i + 1);
        gain.gain.setValueAtTime(0.25 / (i + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + decay);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + decay);
      });
    }
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
}
