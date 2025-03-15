import { describe, expect, test } from 'vitest';
import { QuitAction, QuitGameException } from "./QuitAction.ts";
import { ActionTag } from "../Action.ts";
import { createPlayer } from "../../data/testObjects.ts";

describe("QuitAction", () => {
  test("has correct description", () => {
    expect(new QuitAction().description).toBe("Quit the game.");
  });

  test("has correct tags", () => {
    expect(new QuitAction().tags).toEqual(
      new Set([ActionTag.Quit, ActionTag.InteractiveOnly]),
    );
  });

  test("perform() raises QuitGameException", async () => {
    const player = createPlayer();
    const action: QuitAction = new QuitAction();
    await expect(action.perform(player)).rejects.toBeInstanceOf(QuitGameException);
  });
});
