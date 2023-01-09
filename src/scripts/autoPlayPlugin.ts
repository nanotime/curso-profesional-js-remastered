import { MediaPlayer } from './clase-1';

export class AutoPlay {
  run(player: MediaPlayer) {
    if (player.media?.muted === false) player.toggleMute();
    player.play();
  }
}
