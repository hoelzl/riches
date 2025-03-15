import { Action, ActionTag } from "../Action.ts";
import { Player } from "../Player.ts";

export class HealAction implements Action {
  private static readonly _tags = new Set([ActionTag.Helpful]);

  get description(): string {
    return "Heal yourself or another player.";
  }

  get shortDescription(): string {
    return "Heal";
  }

  get tags(): Set<ActionTag> {
    return HealAction._tags;
  }

  async perform(_player: Player): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
