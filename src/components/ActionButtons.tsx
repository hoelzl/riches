import { v4 as uuidv4 } from "uuid";
import { GameState, nonMovementActions } from "../GameState";
import { Resolver } from "../SelectActionUsingReact";
import { ActionButton } from "./ActionButton";
import styles from "../App.module.css";

type ActionButtonsProps = {
  gameState: GameState;
  resolver: Resolver;
};

export function ActionButtons({ gameState, resolver }: ActionButtonsProps) {
  const actions = nonMovementActions(gameState);
  const children =
    actions.length === 0 ? (
      <p className={styles.overlay + " " + styles.fullWidth}>
        No more actions are available.
      </p>
    ) : (
      actions.map((action) => (
        <ActionButton key={uuidv4()} action={action} resolver={resolver} />
      ))
    );
  return (
    <div key={uuidv4()} className={styles.otherActions}>
      {children}
    </div>
  );
}
