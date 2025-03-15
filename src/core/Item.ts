export class Item {
  constructor(kind: string, name: string, description: string) {
    this._kind = kind;
    this._name = name;
    this._description = description;
    this._discovered = false;
  }

  get kind(): string {
    return this._kind;
  }

  get name(): string {
    if (this._name) {
      return this._name;
    } else {
      return this._kind;
    }
  }

  get description(): string {
    return this._description;
  }

  get discovered(): boolean {
    return this._discovered;
  }

  set discovered(discovered: boolean) {
    this._discovered = discovered;
  }

  private readonly _kind: string;
  private readonly _name: string;
  private readonly _description: string;
  private _discovered: boolean;
}
