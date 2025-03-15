import { MoveAction } from "../core/actions/MoveAction";
import { Resolver } from "../SelectActionUsingReact";
import styles from "../App.module.css";
import { MovementButton } from "./MovementButton";

export const compassDirections = ["north", "south", "east", "west"];

type MovementButtonsProps = {
  actions: MoveAction[];
  resolver: Resolver;
  directions?: string[];
};

export function MovementButtons({
  actions,
  resolver,
  directions = compassDirections,
}: MovementButtonsProps) {
  return (
    <div className={styles.movementActions}>
      {directions.map((direction) => {
        const action = actions.find((a) => a.direction === direction);
        const hidden = action === undefined;
        return (
          <MovementButton
            key={direction}
            direction={direction}
            action={action}
            resolver={resolver}
            hidden={hidden}
          />
        );
      })}
    </div>
  );
}
