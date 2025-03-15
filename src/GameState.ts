import { MoveAction } from "./core/actions/MoveAction";
import { Action, ActionTag } from "./core/Action";
import { Location } from "./core/Location";

export type GameState = {
  currentLocation: Location;
  availableActions: Action[];
  notifications: string[];
};

export function movementActions(GameState: GameState) {
  return GameState.availableActions.filter((action) =>
    action.tags.has(ActionTag.Movement),
  ) as MoveAction[];
}

export function nonMovementActions(GameState: GameState) {
  return GameState.availableActions.filter(
    (action) => !action.tags.has(ActionTag.Movement),
  );
}
