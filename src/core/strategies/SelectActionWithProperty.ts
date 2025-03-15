import { Action } from "../Action.ts";
import { SkipTurnAction } from "../actions/SkipTurnAction.ts";
import { Player } from "../Player.ts";
import { Strategy } from "../Strategy.ts";
import { getRandomElement } from "../utils.ts";

export abstract class SelectActionWithProperty implements Strategy {
  constructor() {
    this.actionPredicate = this.actionPredicate.bind(this);
  }

  get isInteractive(): boolean {
    return false;
  }

  selectAction(_player: Player, actions: Action[]): Promise<Action> {
    if (actions.length === 0) {
      return Promise.resolve(new SkipTurnAction());
    }
    let aggressiveActions = actions.filter(this.actionPredicate);

    return Promise.resolve(
      getRandomElement(aggressiveActions?.length ? aggressiveActions : actions),
    );
  }

  abstract actionPredicate(a: Action): boolean;
}
