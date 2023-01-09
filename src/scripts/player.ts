import { AutoPlay } from './autoPlayPlugin';

export interface Plugin {
  run: (player: MediaPlayer) => void;
}

interface Config {
  el: HTMLVideoElement | null;
  plugins?: Plugin[];
}

export class MediaPlayer {
  media: HTMLVideoElement | null;
  plugins: Plugin[];

  constructor(config: Config) {
    this.media = config.el;
    this.plugins = config.plugins || [];

    this.initPlugins();
  }

  initPlugins() {
    this.plugins.forEach(plugin => plugin.run(this));
  }

  play() {
    this.media?.play();
  }

  pause() {
    this.media?.pause();
  }

  togglePlay() {
    this.media?.paused ? this.media.play() : this.media?.pause();
  }

  toggleMute() {
    if (this.media) this.media.muted = !this.media.muted;
  }
}

const video = document.querySelector('video');
const player = new MediaPlayer({ el: video, plugins: [new AutoPlay()] });

const btnPlay = document.querySelector(
  'button#play-pause'
) as HTMLButtonElement;
btnPlay.addEventListener('click', () => player.togglePlay());

const btnMute = document.querySelector(
  'button#mute-unmute'
) as HTMLButtonElement;
btnMute.addEventListener('click', () => player.toggleMute());
