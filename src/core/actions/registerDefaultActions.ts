import { ActionType, registerDefaultAction } from "../Action.ts";
import { ErrorAction } from "./ErrorAction.ts";
import { InvestigateAction } from "./InvestigateAction.ts";
import { QuitAction } from "./QuitAction.ts";
import { SkipTurnAction } from "./SkipTurnAction.ts";

const allDefaultActionTypes: ActionType[] = [
  InvestigateAction,
  QuitAction,
  SkipTurnAction,
  ErrorAction,
];

let defaultActionsRegistered: boolean = false;

export function registerAllDefaultActions() {
  if (defaultActionsRegistered) {
    return;
  }

  for (const actionType of allDefaultActionTypes) {
    registerDefaultAction(new actionType());
  }
  defaultActionsRegistered = true;
}
