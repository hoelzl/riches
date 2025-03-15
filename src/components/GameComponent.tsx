import { GameState, movementActions } from "../GameState";
import { Resolver } from "../SelectActionUsingReact";
import { ActionButtons } from "./ActionButtons";
import { DescriptionBox } from "./DescriptionBox";
import { GameContainer } from "./GameContainer";
import { compassDirections, MovementButtons } from "./MovementButtons";

type GameComponentProps = {
  gameState: GameState;
  resolver: Resolver;
};

export const GameComponent = ({ gameState, resolver }: GameComponentProps) => {
  return (
    <GameContainer gameState={gameState}>
      <MovementButtons
        actions={movementActions(gameState)}
        resolver={resolver}
        directions={compassDirections}
      />
      <DescriptionBox gameState={gameState} />
      <ActionButtons gameState={gameState} resolver={resolver} />
    </GameContainer>
  );
};
