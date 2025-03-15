import { Action } from "./Action.ts";
import { Player } from "./Player.ts";

export interface Strategy {
  selectAction(player: Player, actions: Action[]): Promise<Action>;
  get isInteractive(): boolean;
}
