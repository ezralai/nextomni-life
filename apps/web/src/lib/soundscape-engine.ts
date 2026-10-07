/**
 * Web Audio API Soundscape Synthesizer
 * 100% Procedural Audio - Zero External Asset Dependencies - Offline Capable
 */

export type SoundscapeType = 'binaural_gamma' | 'rain' | 'white_noise' | 'cafe' | 'none';

class SoundscapeSynthesizer {
  private ctx: AudioContext | null = null;
  private currentType: SoundscapeType = 'none';
  private gainNode: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private volume: number = 0.5;
  private isPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentType(): SoundscapeType {
    return this.currentType;
  }

  public stop() {
    if (!this.ctx) return;
    this.activeNodes.forEach(node => {
      if (typeof node === 'number') {
        window.clearInterval(node);
      } else if (node && 'stop' in node && typeof (node as any).stop === 'function') {
        try {
          (node as any).stop();
        } catch (_) {}
      }
      try {
        if (typeof node !== 'number' && node && 'disconnect' in node && typeof (node as any).disconnect === 'function') {
          (node as any).disconnect();
        }
      } catch (_) {}
    });
    this.activeNodes = [];
    this.isPlaying = false;
    this.currentType = 'none';
  }

  public play(type: SoundscapeType) {
    if (type === 'none') {
      this.stop();
      return;
    }

    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);
    this.currentType = type;
    this.isPlaying = true;

    if (type === 'binaural_gamma') {
      this.playBinauralGamma();
    } else if (type === 'rain') {
      this.playProceduralRain();
    } else if (type === 'white_noise') {
      this.playDeepWhiteNoise();
    } else if (type === 'cafe') {
      this.playCafeResonance();
    }
  }

  /**
   * 40Hz Gamma Neural Synchrony (Cal Newport Deep Focus)
   * Base frequency 200Hz, Left: 200Hz, Right: 240Hz
   */
  private playBinauralGamma() {
    if (!this.ctx || !this.gainNode) return;

    // Stereo Panner or Channel Merger
    const merger = this.ctx.createChannelMerger(2);

    // Left Ear: 200 Hz
    const oscLeft = this.ctx.createOscillator();
    oscLeft.type = 'sine';
    oscLeft.frequency.setValueAtTime(200, this.ctx.currentTime);

    // Right Ear: 240 Hz (Delta = 40Hz Gamma wave)
    const oscRight = this.ctx.createOscillator();
    oscRight.type = 'sine';
    oscRight.frequency.setValueAtTime(240, this.ctx.currentTime);

    const gainL = this.ctx.createGain();
    gainL.gain.value = 0.25;
    const gainR = this.ctx.createGain();
    gainR.gain.value = 0.25;

    oscLeft.connect(gainL);
    gainL.connect(merger, 0, 0); // left channel

    oscRight.connect(gainR);
    gainR.connect(merger, 0, 1); // right channel

    merger.connect(this.gainNode);

    oscLeft.start();
    oscRight.start();

    this.activeNodes.push(oscLeft, oscRight, gainL, gainR, merger);
  }

  /**
   * Procedural Soothing Rain (Filtered Pink Noise with Randomized Droplet Amplitude)
   */
  private playProceduralRain() {
    if (!this.ctx || !this.gainNode) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate soft raindrops
    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(800, this.ctx.currentTime);

    whiteNoise.connect(lowpass);
    lowpass.connect(this.gainNode);
    whiteNoise.start();

    this.activeNodes.push(whiteNoise, lowpass);
  }

  /**
   * Deep Cosmic White Noise (Smooth Brown Filtered)
   */
  private playDeepWhiteNoise() {
    if (!this.ctx || !this.gainNode) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 1.8; // Boost gentle brownian rumble
    }

    const brownNoise = this.ctx.createBufferSource();
    brownNoise.buffer = noiseBuffer;
    brownNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    brownNoise.connect(filter);
    filter.connect(this.gainNode);
    brownNoise.start();

    this.activeNodes.push(brownNoise, filter);
  }

  /**
   * Cafe Resonance (Warm acoustic gentle murmurs)
   */
  private playCafeResonance() {
    if (!this.ctx || !this.gainNode) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.08;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(350, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(1.2, this.ctx.currentTime);

    noise.connect(bandpass);
    bandpass.connect(this.gainNode);
    noise.start();

    this.activeNodes.push(noise, bandpass);
  }
}

export const soundscape = typeof window !== 'undefined' ? new SoundscapeSynthesizer() : (null as any);
