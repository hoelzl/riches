import { Action, ActionTag } from "../Action.ts";
import { SelectActionWithProperty } from "./SelectActionWithProperty.ts";

export class SelectAggressiveAction extends SelectActionWithProperty {
  actionPredicate(a: Action): boolean {
    return a.tags.has(ActionTag.Aggressive);
  }
}
