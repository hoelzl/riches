import React from "react";
import { GameState } from "../GameState";
import styles from "../App.module.css";

export const mixedStyles = {
  topOverlay: styles.fullWidth + " " + " " + styles.topOverlay,
  bottomContent: styles.fullWidth + " " + styles.bottomContent,
};

function imageLocation(imageName: string) {
  return `/images/${imageName}.webp`;
}

type GameContainerProps = {
  gameState: GameState;
  children: React.ReactNode;
};

export function GameContainer({ gameState, children }: GameContainerProps) {
  return (
    <div className={styles.gameContainer}>
      <img
        className={styles.backgroundImage}
        src={imageLocation(gameState.currentLocation.imageName)}
        alt={gameState.currentLocation.name}
      />
      <div className={mixedStyles.topOverlay}>
        <h1>{gameState.currentLocation.name}</h1>
      </div>
      <div className={mixedStyles.bottomContent}>{children}</div>
    </div>
  );
}
