import config from "./config.ts";
import { GameObserver, GameOverReason } from "./GameObserver.ts";
import { World } from "./World.ts";
import {
  createWorldFromJsonData,
  createWorldFromString,
  RawGameData,
} from "./worldFactory.ts";
import { Strategy } from "./Strategy.ts";
import { Player } from "./Player.ts";
import { GameInProgress, Result } from "./Result.ts";
import { QuitGameException } from "./actions/QuitAction.ts";

export class Game {
  constructor(gameData: string | RawGameData, observer?: GameObserver) {
    if (typeof gameData === "string") {
      this._world = createWorldFromString(gameData);
    } else {
      this._world = createWorldFromJsonData(gameData);
    }
    if (observer) {
      this.registerObserver(observer);
    }
  }

  get world(): World {
    return this._world;
  }

  // noinspection JSUnusedGlobalSymbols
  addPlayerByName(name: string, strategy: Strategy): Player {
    return this.addPlayerByLocation(
      name,
      this._world.initialLocationName,
      strategy,
    );
  }

  addPlayerByLocation(
    name: string,
    location: string,
    strategy: Strategy,
  ): Player {
    return this.addPlayer(
      new Player(name, this._world.getLocation(location), strategy),
    );
  }

  addPlayer(player: Player): Player {
    for (let observer of this._observers) {
      player.registerObserver(observer);
    }
    this._players.push(player);
    return player;
  }

  registerObserver(observer: GameObserver): void {
    for (let player of this._players) {
      player.registerObserver(observer);
    }
    this._observers.push(observer);
  }

  // noinspection JSUnusedGlobalSymbols
  async run(): Promise<void> {
    try {
      this.notifyGameStarted();
      for (let player of this._players) {
        for (let i = 0; i < config.maxNumTurns; i++) {
          this.notifyTurnStarted(player);
          await player.takeTurn();
        }
      }
      this.notifyGameOver(GameOverReason.TurnLimitReached);
      this.notifyResult();
    } catch (e: any) {
      if (e instanceof QuitGameException) {
        this.notifyGameOver(GameOverReason.Quit);
      } else {
        this.notifyException(e.message);
        this.notifyGameOver(GameOverReason.Error);
      }
    }
  }

  private notifyGameStarted(): void {
    for (let observer of this._observers) {
      observer.noteGameStarted(this);
    }
  }

  private notifyTurnStarted(player: Player): void {
    for (let observer of this._observers) {
      observer.noteTurnStarted(player);
    }
  }

  private notifyGameOver(reason: GameOverReason): void {
    for (let observer of this._observers) {
      observer.noteGameOver(this, reason);
    }
  }

  private notifyResult(): void {
    for (let observer of this._observers) {
      observer.noteResult(this, this._result);
    }
  }

  private notifyException(msg: string): void {
    for (let observer of this._observers) {
      observer.noteException(this, msg);
    }
  }

  private readonly _world: World;
  private _players: Player[] = [];
  private _observers: GameObserver[] = [];
  private _result: Result = new GameInProgress();
}
