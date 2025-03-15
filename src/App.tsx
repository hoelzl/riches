import { useEffect, useState } from "react";
import { Game } from "./core/Game";
import gameData from "./data/dungeon.json";
import { Location } from "./core/Location";
import { Player } from "./core/Player";
import { GameComponent } from "./components/GameComponent";
import { GameState } from "./GameState";
import { Resolver, SelectActionUsingReact } from "./SelectActionUsingReact";
import { UpdateStateObserver } from "./UpdateStateObserver";

const initialState: GameState = {
  currentLocation: new Location("Invalid Location", ""),
  availableActions: [],
  notifications: [],
};

function createGameAndPlayer(
  setResolver: (resolver: Resolver) => void,
): [Game, Player] {
  const game = new Game(gameData);
  const interactivePlayer = new Player(
    "Interactive Player",
    game.world.initialLocation,
    new SelectActionUsingReact(setResolver),
  );
  game.addPlayer(interactivePlayer);
  return [game, interactivePlayer];
}

function createAndConfigureGameAndPlayer(
  setResolver: (resolver: Resolver) => void,
): [Game, Player] {
  const [game, player] = createGameAndPlayer(setResolver);
  initialState.currentLocation = player.location;
  initialState.availableActions = player.getPossibleActions();
  return [game, player];
}

function createAndConfigureObserver(
  game: Game,
  gameState: GameState,
  setGameState: (
    value: ((prevState: GameState) => GameState) | GameState,
  ) => void,
) {
  const observer = new UpdateStateObserver(gameState);
  game.registerObserver(observer);
  const updateGameStateFromObserver = () => {
    setGameState({ ...observer.state });
  };
  observer.onStateChange = updateGameStateFromObserver;
  return updateGameStateFromObserver;
}

const App = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [resolver, setResolver] = useState<Resolver>({
    resolve: () => {},
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const [game] = createAndConfigureGameAndPlayer(setResolver);
    createAndConfigureObserver(game, gameState, setGameState);
    game.run().catch((error: any) => {
      setError(error.toString());
    });
  }, []);

  if (error) {
    return (
      <div>
        <h1>An error has Occurred</h1>
        <p>{error}</p>
      </div>
    );
  }

  return <GameComponent gameState={gameState} resolver={resolver} />;
};

export default App;
