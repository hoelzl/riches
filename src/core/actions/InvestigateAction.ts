import { Action, ActionTag } from "../Action.ts";
import { Player } from "../Player.ts";

export class InvestigateAction implements Action {
  get description(): string {
    return "Investigate the current location.";
  }

  get shortDescription(): string {
    return "Investigate";
  }

  get tags(): Set<ActionTag> {
    return new Set([ActionTag.Investigation, ActionTag.Aggressive]);
  }

  async perform(player: Player): Promise<void> {
    const items = player.location.items;
    if (items.length === 0) {
      player.notify("You investigate the area but find nothing of interest.");
      return;
    }
    let msg = "You investigate the area.\n";
    for (let item of items) {
      item.discovered = true;
      msg += `\n- You find a ${item.name}.`;
    }
    player.notify(msg);
  }
}
