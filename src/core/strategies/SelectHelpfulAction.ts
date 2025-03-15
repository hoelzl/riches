import { Action, ActionTag } from "../Action.ts";
import { SelectActionWithProperty } from "./SelectActionWithProperty.ts";

export class SelectHelpfulAction extends SelectActionWithProperty {
  actionPredicate(a: Action): boolean {
    return a.tags.has(ActionTag.Helpful);
  }
}
