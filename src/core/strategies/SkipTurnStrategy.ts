import { Strategy } from "../Strategy.ts";
import { Player } from "../Player.ts";
import { Action } from "../Action.ts";
import { SkipTurnAction } from "../actions/SkipTurnAction.ts";

export class SkipTurnStrategy implements Strategy {
  get isInteractive(): boolean {
    return false;
  }

  selectAction(_player: Player, _actions: Action[]): Promise<Action> {
    return Promise.resolve(new SkipTurnAction());
  }
}
