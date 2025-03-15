import { Action } from "./Action.ts";
import { Player } from "./Player.ts";
import { Result } from "./Result.ts";
import { Game } from "./Game.ts";
import { PlayerObserver } from "./PlayerObserver.ts";

// noinspection JSUnusedGlobalSymbols
export enum GameOverReason {
  PlayerWon,
  PlayerDied,
  Quit,
  Error,
  TurnLimitReached,
}

export interface GameObserver extends PlayerObserver {
  noteGameStarted(game: Game): void;
  noteGameOver(game: Game, reason: GameOverReason): void;
  noteResult(game: Game, result: Result): void;
  noteException(game: Game, msg: string): void;
}

export class GameObserverBase implements GameObserver {
  noteActionImpossible(
    _player: Player,
    _action: Action,
    _reason: string,
  ): void {}

  noteActionPerformed(_player: Player, _action: Action): void {}

  noteException(_game: Game, _msg: string): void {}

  noteGameOver(_game: Game, _reason: GameOverReason): void {}

  noteGameQuit(_player: Player, _reason: string): void {}

  noteGameStarted(_game: Game): void {}

  notePossibleActions(_player: Player, _actions: Action[]): void {}

  noteResult(_game: Game, _result: Result): void {}

  noteStartingAction(_player: Player, _action: Action): void {}

  noteTurnStarted(_player: Player): void {}

  notify(_player: Player, _msg: string): void {}
}
