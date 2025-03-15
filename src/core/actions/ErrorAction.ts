import { Action, ActionTag } from "../Action.ts";
import { Player } from "../Player.ts";

export class ErrorAction implements Action {
  private static readonly _tags = new Set([
    ActionTag.Error,
    ActionTag.TestOnly,
    ActionTag.InteractiveOnly,
  ]);

  get description(): string {
    return "Throw an error for testing purposes.";
  }

  get shortDescription(): string {
    return "TEST: Error";
  }

  get tags(): Set<ActionTag> {
    return ErrorAction._tags;
  }

  async perform(_player: Player): Promise<void> {
    throw new Error("This is an error for testing purposes.");
  }
}
