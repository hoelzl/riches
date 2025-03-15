import React, { useEffect, useRef } from "react";
import { GameState } from "../GameState";
import styles from "../App.module.css";

export const mixedStyles = {
  descriptionBox: styles.overlay + " " + styles.descriptionBox,
};

type DescriptionBoxProps = {
  gameState: GameState;
};

export function DescriptionBox({ gameState }: DescriptionBoxProps) {
  const descriptionBoxRef: React.MutableRefObject<null> = useRef(null);

  useEffect(() => {
    const descriptionBox: any = descriptionBoxRef.current;
    if (descriptionBox) {
      if (gameState.notifications.length > 0) {
        descriptionBox.scrollTop = descriptionBox.scrollHeight;
      } else {
        descriptionBox.scrollTop = 0;
      }
    }
  }, [gameState.notifications]);

  return (
    <div
      ref={descriptionBoxRef}
      id={"descriptionBox"}
      className={mixedStyles.descriptionBox}
    >
      <p className={styles.descriptionText}>
        {gameState.currentLocation.description}
      </p>
      {gameState.notifications.map((notification, index) => (
        <div key={index}>
          <hr />
          <div
            className={styles.descriptionText}
            dangerouslySetInnerHTML={{ __html: notification }}
          ></div>
        </div>
      ))}
    </div>
  );
}
