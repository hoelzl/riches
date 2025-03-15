import { Action, ActionTag, getDefaultActions } from "./Action.ts";
import { MoveAction } from "./actions/MoveAction.ts";
import { QuitGameException } from "./actions/QuitAction.ts";
import { registerAllDefaultActions } from "./actions/registerDefaultActions.ts";
import { SkipTurnAction } from "./actions/SkipTurnAction.ts";
import config from "./config.ts";
import { GameObserver } from "./GameObserver.ts";
import { Location } from "./Location.ts";
import { Pawn } from "./Pawn.ts";
import { PlayerObserver } from "./PlayerObserver.ts";
import { Strategy } from "./Strategy.ts";

registerAllDefaultActions();

export class Player {
  private _pawn: Pawn;
  private _observers: PlayerObserver[] = [];
  private _strategy: Strategy;

  constructor(name: string, location: Location, strategy: Strategy) {
    this._pawn = new Pawn(name, location);
    this._strategy = strategy;
  }

  get strategy(): Strategy {
    return this._strategy;
  }

  // noinspection JSUnusedGlobalSymbols
  set strategy(strategy: Strategy) {
    this._strategy = strategy;
  }

  get name(): string {
    return this._pawn.name;
  }

  get location(): Location {
    return this._pawn.location;
  }

  // noinspection JSUnusedGlobalSymbols
  get description(): string {
    return `${this.name} at ${this.location.name}`;
  }

  moveToLocation(location: Location): void {
    this._pawn.moveToLocation(location);
  }

  async takeTurn(): Promise<void> {
    let actions = this.getPossibleActions();
    let action = await this.selectAction(actions);
    if (!action) {
      action = new SkipTurnAction();
    }
    return this.performIfPossible(action);
  }

  getPossibleActions(addTestOnlyActions: boolean = config.debug): Action[] {
    // console.log("Getting possible actions for player: ", this.name);
    let result: Action[] = [...this.location.possibleActions];
    for (let [direction, _] of this.location.exits) {
      result.push(new MoveAction(direction));
    }
    result = result.concat(
      this.getNonInteractiveDefaultActions(addTestOnlyActions),
    );
    if (this.strategy.isInteractive) {
      result = result.concat(
        this.getInteractiveDefaultActions(addTestOnlyActions),
      );
    }
    this.notePossibleActions(result);
    return result;
  }

  getNonInteractiveDefaultActions(
    addTestOnlyActions: boolean = false,
  ): Action[] {
    return getDefaultActions().filter((action) => {
      if (!addTestOnlyActions && action.tags.has(ActionTag.TestOnly)) {
        return false;
      }
      return !action.tags.has(ActionTag.InteractiveOnly);
    });
  }

  getInteractiveDefaultActions(addTestOnlyActions: boolean = false): Action[] {
    return getDefaultActions().filter((action) => {
      if (!addTestOnlyActions && action.tags.has(ActionTag.TestOnly)) {
        return false;
      }
      return action.tags.has(ActionTag.InteractiveOnly);
    });
  }

  async selectAction(actions: Action[]): Promise<Action> {
    if (actions.length === 0) {
      return new SkipTurnAction();
    }
    return this.strategy.selectAction(this, actions);
  }

  async perform(action: Action): Promise<void> {
    this.noteStartingAction(action);
    await action.perform(this);
    this.noteActionPerformed(action);
  }

  async performIfPossible(action: Action): Promise<void> {
    try {
      await this.perform(action);
    } catch (e: any) {
      if (e instanceof QuitGameException) {
        this.noteGameQuit();
        throw e;
      } else {
        this.noteActionImpossible(action, e.message);
      }
    }
  }

  registerObserver(observer: GameObserver): void {
    this._observers.push(observer);
  }

  public notify(message: string): void {
    for (let observer of this._observers) {
      observer.notify(this, message);
    }
  }

  private notePossibleActions(actions: Action[]): void {
    // console.log("Notifying possible actions: ", actions);
    for (let observer of this._observers) {
      observer.notePossibleActions(this, actions);
    }
  }

  private noteStartingAction(action: Action): void {
    for (let observer of this._observers) {
      observer.noteStartingAction(this, action);
    }
  }

  private noteActionPerformed(action: Action): void {
    for (let observer of this._observers) {
      observer.noteActionPerformed(this, action);
    }
  }

  private noteActionImpossible(action: Action, message: string): void {
    for (let observer of this._observers) {
      observer.noteActionImpossible(this, action, message);
    }
  }

  private noteGameQuit(): void {
    for (let observer of this._observers) {
      observer.noteGameQuit(this, "Game quit by player.");
    }
  }
}
