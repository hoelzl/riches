import { Action } from "../core/Action.ts";
import { SkipTurnAction } from "../core/actions/SkipTurnAction.ts";
import { Game } from "../core/Game.ts";
import { GameObserver, GameOverReason } from "../core/GameObserver.ts";
import { Player } from "../core/Player.ts";
import { Result } from "../core/Result.ts";
import { SkipTurnStrategy } from "../core/strategies/SkipTurnStrategy.ts";
import { Strategy } from "../core/Strategy.ts";
import { World } from "../core/World.ts";
import { createWorldFromJsonData } from "../core/worldFactory.ts";
import simpleGameData from "./simpleGame.json" assert { type: "json" };

type WorldAndPlayerParams = {
  strategy?: Strategy;
  observer?: GameObserver;
};

export function createWorldAndPlayer(
  params: WorldAndPlayerParams = {},
): [World, Player] {
  const world = createWorldFromJsonData(simpleGameData);
  const player = new Player(
    "Test Player",
    world.getLocation("Room 1"),
    params?.strategy ?? new SkipTurnStrategy(),
  );
  if (params.observer) {
    player.registerObserver(params.observer);
  }
  return [world, player];
}

export function createPlayer(params: WorldAndPlayerParams = {}): Player {
  return createWorldAndPlayer(params)[1];
}

export class InteractiveStrategyForTests implements Strategy {
  get isInteractive(): boolean {
    return true;
  }

  selectAction(_player: Player, actions: Action[]): Promise<Action> {
    return Promise.resolve(actions?.[0] ?? new SkipTurnAction());
  }
}

export class ErrorStrategyForTests implements Strategy {
  get isInteractive(): boolean {
    return true;
  }

  selectAction(_player: Player, _actions: Action[]): Promise<Action> {
    throw new Error("This strategy always throws an error.");
  }
}

export class GameObserverForTests implements GameObserver {
  public calls: string[] = [];

  noteActionImpossible(_player: Player, action: Action, reason: string): void {
    this.calls.push(
      `noteActionImpossible: ${action.constructor.name} (${reason})`,
    );
  }

  noteStartingAction(_player: Player, action: Action) {
    this.calls.push(`noteStartingAction: ${action.constructor.name}`);
  }

  noteActionPerformed(_player: Player, action: Action): void {
    this.calls.push(`noteActionPerformed: ${action.constructor.name}`);
  }

  noteException(_game: Game, msg: string): void {
    this.calls.push(`noteException: ${msg}`);
  }

  noteGameOver(_game: Game, reason: GameOverReason): void {
    this.calls.push(`noteGameOver: ${reason}`);
  }

  noteGameStarted(_game: Game): void {
    this.calls.push("noteGameStarted");
  }

  notePossibleActions(_player: Player, actions: Action[]): void {
    this.calls.push(
      `notePossibleActions ${actions.map((a) => a.constructor.name).join(", ")}`,
    );
  }

  noteResult(_game: Game, result: Result): void {
    this.calls.push(`noteResult: ${result.description}`);
  }

  noteTurnStarted(player: Player): void {
    this.calls.push(`noteTurnStarted: ${player.name}`);
  }

  noteGameQuit(_player: Player, reason: string) {
    this.calls.push(`noteQuitAction: ${reason}`);
  }

  notify(_player: Player, msg: string): void {
    this.calls.push(`notify: ${msg}`);
  }
}

export function createPlayerAndObserver(): [Player, GameObserverForTests] {
  let observer = new GameObserverForTests();
  const player = createPlayer({ observer: observer });
  return [player, observer];
}
