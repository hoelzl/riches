import { Action, ActionTag } from "./core/Action";
import { Game } from "./core/Game";
import {
  GameObserverBase,
  GameOverReason,
} from "./core/GameObserver";
import { Player } from "./core/Player";
import { GameState } from "./GameState";
import { Converter } from "showdown";

export class UpdateStateObserver extends GameObserverBase {
  constructor(state: GameState) {
    super();
    this.state = { ...state };
    this.onStateChange = () => {};
  }

  notify(_player: Player, msg: string) {
    const html = this.mdConverter.makeHtml(msg);
    this.state.notifications = this.state.notifications.concat(html);
    this.onStateChange();
  }

  noteGameOver(_game: Game, _reason: GameOverReason) {
    this.state.availableActions = [];
    this.onStateChange();
  }

  notePossibleActions(_player: Player, actions: Action[]) {
    this.state.availableActions = this.removeQuitAction(actions);
    this.onStateChange();
  }

  noteTurnStarted(_player: Player) {
    this.state.availableActions = [];
    if (_player.location !== this.state.currentLocation) {
      this.state.currentLocation = _player.location;
      this.state.notifications = [];
    }
    this.onStateChange();
  }

  private removeQuitAction(actions: Action[]): Action[] {
    return actions.filter((action) => !action.tags.has(ActionTag.Quit));
  }

  state: GameState;
  onStateChange: () => void;
  mdConverter = new Converter();
}
