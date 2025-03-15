import { describe, expect, test } from 'vitest';
import {
  ConnectionData,
  createWorldFromString,
  GameData,
  createGameDataFromString,
  createWorldFromJsonData,
} from "./worldFactory.ts";
import { World } from "./World.ts";
import minimalGameData from "../data/minimalGame.json" assert { type: "json" };
import simpleGameData from "../data/simpleGame.json" assert { type: "json" };

const minimalGameJsonString: string = `
{
  "locations": [
    { "name": "Room-1" },
    { "name": "Room-2" }
  ]
}
`;

const simpleGameJsonString: string = `
{
  "initialLocation": "Room 1",
  "locations": [
    {
      "name": "Room 1",
      "description": "You are in a bright room. There is a door to the north.",
      "connections": [
        {
          "direction": "north",
          "destination": "Room 2"
        }
      ]
    },
    {
      "name": "Room 2",
      "description": "You are in a dark room. There is a door to the south.",
      "connections": [
        {
          "direction": "south",
          "destination": "Room 1"
        }
      ],
      "imageName": "room2",
      "items": [
        {
          "kind": "key",
          "name": "Shiny Key",
          "description": "A shiny key"
        }
      ]
    }
  ]
}
`;

function checkSingleConnection(
  connections: ConnectionData[],
  direction: string,
  destination: string,
) {
  expect(connections.length).toBe(1);
  expect(connections[0].direction).toBe(direction);
  expect(connections[0].destination).toBe(destination);
}

describe("createGameDataFromString(minimalGameJsonString)", () => {
  test("returns correct initial location", () => {
    const gameData: GameData = createGameDataFromString(minimalGameJsonString);
    expect(gameData.initialLocationName).toBe("Room-1");
  });

  test("returns correct location names", () => {
    const gameData: GameData = createGameDataFromString(minimalGameJsonString);
    expect(gameData.locationData.length).toBe(2);
    expect(gameData.locationData[0].name).toBe("Room-1");
    expect(gameData.locationData[1].name).toBe("Room-2");
  });

  test("handles empty description correctly", () => {
    const gameData: GameData = createGameDataFromString(minimalGameJsonString);
    expect(gameData.locationData[0].description).toBe("");
  });

  test("handles empty connections correctly", () => {
    const gameData: GameData = createGameDataFromString(minimalGameJsonString);
    expect(gameData.locationData[0].connections).toEqual([]);
  });

  test("handles empty items correctly", () => {
    const gameData: GameData = createGameDataFromString(minimalGameJsonString);
    expect(gameData.locationData[0].items).toEqual([]);
  });
});

describe("createGameDataFromString(simpleGameJsonString)", () => {
  test("returns correct initial location", () => {
    const gameData: GameData = createGameDataFromString(simpleGameJsonString);
    expect(gameData.initialLocationName).toBe("Room 1");
  });

  test("returns correct basic location data", () => {
    const gameData: GameData = createGameDataFromString(simpleGameJsonString);
    expect(gameData.locationData.length).toBe(2);
    expect(gameData.locationData[0].name).toBe("Room 1");
    expect(gameData.locationData[0].description).toContain("bright room");
    expect(gameData.locationData[0].items).toHaveLength(0);
    expect(gameData.locationData[1].name).toBe("Room 2");
    expect(gameData.locationData[1].description).toContain("dark room");
    expect(gameData.locationData[1].items).toHaveLength(1);
  });

  test("returns correct connections for first location", () => {
    const gameData: GameData = createGameDataFromString(simpleGameJsonString);
    let location = gameData.locationData[0];
    let connections = location.connections;
    checkSingleConnection(connections, "north", "Room 2");
  });

  test("returns correct connections for second location", () => {
    const gameData: GameData = createGameDataFromString(simpleGameJsonString);
    let location = gameData.locationData[1];
    let connections = location.connections;
    checkSingleConnection(connections, "south", "Room 1");
  });
});

function testsForMinimalGame(creator: () => World): () => void {
  return () => {
    test("creates World instance", () => {
      const world = creator();
      expect(world).toBeInstanceOf(World);
    });

    test("has correct initial location name", () => {
      const world = creator();
      expect(world.initialLocationName).toBe("Room-1");
    });

    test("has correct locations", () => {
      const world = creator();
      expect(world.locationMap.size).toBe(2);
      let room1 = world.getLocation("Room-1");
      expect(room1.description).toBe("");
      let room2 = world.getLocation("Room-2");
      expect(room2.description).toBe("");
    });

    test("has correct connections", () => {
      const world = creator();
      let room1 = world.getLocation("Room-1");
      let room2 = world.getLocation("Room-2");
      expect(room1.exits.size).toBe(0);
      expect(room2.exits.size).toBe(0);
    });

    test("has correct items", () => {
      const world = creator();
      let room1 = world.getLocation("Room-1");
      let room2 = world.getLocation("Room-2");
      expect(room1.items.length).toBe(0);
      expect(room2.items.length).toBe(0);
    });
  };
}

describe(
  "createWorldFromString(minimalGameJsonString)",
  testsForMinimalGame(() => createWorldFromString(minimalGameJsonString)),
);

describe(
  "createWorldFromJsonData(minimalGameData)",
  testsForMinimalGame(() => createWorldFromJsonData(minimalGameData)),
);

function testsForSimpleGame(creator: () => World): () => void {
  return () => {
    test("creates World instance", () => {
      const world = creator();
      expect(world).toBeInstanceOf(World);
    });

    test("has correct initial location name", () => {
      const world = creator();
      expect(world.initialLocationName).toBe("Room 1");
    });

    test("has correct locations", () => {
      const world = creator();
      expect(world.locationMap.size).toBe(2);
      let room1 = world.getLocation("Room 1");
      expect(room1.description).toContain("bright room");
      let room2 = world.getLocation("Room 2");
      expect(room2.description).toContain("dark room");
    });

    test("has correct connections", () => {
      const world = creator();
      let room1 = world.getLocation("Room 1");
      let room2 = world.getLocation("Room 2");
      expect(room1.exits.size).toBe(1);
      expect(room1.exits.get("north")).toBe(room2);
      expect(room2.exits.size).toBe(1);
      expect(room2.exits.get("south")).toBe(room1);
    });

    test("has correct items", () => {
      const world = creator();
      let room1 = world.getLocation("Room 1");
      let room2 = world.getLocation("Room 2");
      expect(room1.items.length).toBe(0);
      expect(room2.items.length).toBe(1);
      let shinyKey = room2.items[0];
      expect(shinyKey.kind).toBe("key");
      expect(shinyKey.name).toBe("Shiny Key");
      expect(shinyKey.description).toBe("A shiny key");
    });
  };
}

describe(
  "createWorldFromString(simpleGameJsonString)",
  testsForSimpleGame(() => createWorldFromString(simpleGameJsonString)),
);

describe(
  "createWorldFromJsonData(simpleGameData)",
  testsForSimpleGame(() => createWorldFromJsonData(simpleGameData)),
);
