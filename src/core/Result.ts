export class Result {
  get description(): string {
    return `Result: ${this.constructor.name}`;
  }

  // noinspection JSUnusedGlobalSymbols
  isGameInProgress(): boolean {
    return false;
  }

  // noinspection JSUnusedGlobalSymbols
  hasPlayerWon(): boolean {
    return false;
  }

  // noinspection JSUnusedGlobalSymbols
  hasPlayerDied(): boolean {
    return false;
  }
}

export class GameInProgress extends Result {
  isGameInProgress(): boolean {
    return true;
  }
}

// noinspection JSUnusedGlobalSymbols
export class PlayerWon extends Result {
  hasPlayerWon(): boolean {
    return true;
  }
}

// noinspection JSUnusedGlobalSymbols
export class PlayerDied extends Result {
  hasPlayerDied(): boolean {
    return true;
  }
}
