
export interface BoundDataType {
  minlat: number;
  minlon: number;
  maxlat: number;
  maxlon: number;
}

export interface GeometryDataType {
  lat: number;
  lon: number;
}

export interface TagsDataType {
  bicycle: string;
  gender: string;
  highway: string;
  lanes: string;
  motorroad: string;
  name: string;
  'name:hi': string;
  'name:mr': string;
  oneway: string;
  source: string;
}

export interface RoadDataType {
  bounds: BoundDataType;
  geometry: GeometryDataType[];
  id: number;
  nodes: number[];
  tags: TagsDataType;
  type: string;
}

export interface GenderDataType {
  Highway_Name: string;
  Named_After: string;
  Gender: string
}

export interface MapDataType {
  width: number;
  height: number;
  translate: [number, number];
  mapScale: number
}

export interface CitySettingsDataType {
  city: string;
  splitMapData: MapDataType;
  combinedMapData: MapDataType;
}