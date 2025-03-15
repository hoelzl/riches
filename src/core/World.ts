import { Location } from "./Location.ts";

export class World {
  constructor(initialLocationName: string, locations: Map<string, Location>) {
    this._initialLocationName = initialLocationName;
    this._locationMap = locations;
  }

  get initialLocationName(): string {
    return this._initialLocationName;
  }

  // noinspection JSUnusedGlobalSymbols
  get initialLocation(): Location {
    return this.getLocation(this._initialLocationName);
  }

  get locationMap(): Map<string, Location> {
    return this._locationMap;
  }

  getLocation(name: string): Location {
    let location = this._locationMap.get(name);
    if (!location) {
      throw new Error(`Location ${name} not found`);
    }
    return location;
  }

  // noinspection JSUnusedGlobalSymbols
  addLocation(location: Location): void {
    if (this._locationMap.has(location.name)) {
      throw new Error(`Location ${location.name} already exists`);
    }
    this._locationMap.set(location.name, location);
  }

  private readonly _locationMap: Map<string, Location>;
  private readonly _initialLocationName: string;
}
