import { Player } from "./Player.ts";

// noinspection JSUnusedGlobalSymbols
export enum ActionTag {
  // Action types
  Movement,
  Interaction,
  Investigation,
  Rest,
  // Player disposition
  Aggressive,
  Defensive,
  Helpful,
  // Meta actions
  SkipTurn,
  Quit,
  Save,
  // Action Properties
  InteractiveOnly,
  Error,
  TestOnly,
  // Size of set for action tags
  ActionTagCount,
}

export interface Action {
  get description(): string;
  get shortDescription(): string;

  get tags(): Set<ActionTag>;

  perform(player: Player): Promise<void>;
}

export type ActionType = { new (...args: unknown[]): Action };

const defaultActions: Action[] = [];

export function registerDefaultAction(action: Action): void {
  defaultActions.push(action);
}

export function getDefaultActions(): Action[] {
  return defaultActions;
}
