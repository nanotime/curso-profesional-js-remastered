import { MediaPlayer } from './player';

export class AutoPlay {
  run(player: MediaPlayer) {
    if (player.media?.muted === false) player.toggleMute();
    player.play();
  }
}
