import { Action, ActionTag } from "../Action.ts";
import { Player } from "../Player.ts";

export class SkipTurnAction implements Action {
  get description(): string {
    return "Do nothing during the current turn.";
  }

  get shortDescription(): string {
    return "Skip Turn";
  }

  get tags(): Set<ActionTag> {
    return new Set([ActionTag.SkipTurn]);
  }

  async perform(player: Player): Promise<void> {
    player.notify("You decide to take a small break.");
  }
}
