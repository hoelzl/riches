import { Action, ActionTag } from "../Action.ts";
import { Item } from "../Item.ts";
import { Player } from "../Player.ts";

export class TakeAction implements Action {
  constructor(public item: Item) {}

  get description(): string {
    return `Take the ${this.item.name}.`;
  }

  get shortDescription(): string {
    return `Take ${this.item.name}`;
  }

  get tags(): Set<ActionTag> {
    return new Set([ActionTag.Interaction]);
  }

  async perform(player: Player): Promise<void> {
    player.location.removeItem(this.item);
    player.notify(`You take the ${this.item.name}.`);
  }
}
