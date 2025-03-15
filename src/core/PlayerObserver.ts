import { Action } from "./Action.ts";
import { Player } from "./Player.ts";

export interface PlayerObserver {
  notify(player: Player, msg: string): void;

  noteTurnStarted(player: Player): void;

  notePossibleActions(player: Player, actions: Action[]): void;

  noteStartingAction(player: Player, action: Action): void;

  noteActionPerformed(player: Player, action: Action): void;

  noteActionImpossible(player: Player, action: Action, reason: string): void;

  noteGameQuit(player: Player, reason: string): void;
}
