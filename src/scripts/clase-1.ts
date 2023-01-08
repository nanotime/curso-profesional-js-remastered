type Conf = {
  el: HTMLVideoElement | null;
};

export class MediaPlayer {
  media: HTMLVideoElement | null;

  constructor(config: Conf) {
    this.media = config.el;
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
}

const video = document.querySelector('video');
const player = new MediaPlayer({ el: video });

const button = document.querySelector('button');
button?.addEventListener('click', () => player.togglePlay());
