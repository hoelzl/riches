import { Action } from "./core/Action";
import { Player } from "./core/Player";
import { Strategy } from "./core/Strategy";

export type ResolverFun = (action: Action) => void;
export type Resolver = { resolve: ResolverFun; promise?: Promise<Action> };

export class SelectActionUsingReact implements Strategy {
  constructor(public setResolver: (resolver: Resolver) => void) {}

  get isInteractive(): boolean {
    return true;
  }

  async selectAction(_player: Player, _actions: Action[]): Promise<Action> {
    // console.log("SelectActionUsingReact.selectAction");
    // @ts-ignore
    const { promise, resolve } = Promise.withResolvers(
      new Promise<Action>((action) => action),
    );
    if (promise === undefined) {
      throw new Error(
        "SelectActionUsingReact.selectAction: promise is undefined",
      );
    }
    this.setResolver({ resolve, promise });
    return promise;
  }
}
