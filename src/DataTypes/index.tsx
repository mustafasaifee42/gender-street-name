
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
  name: string;
  gender: string
}

export interface RoadDataType {
  bounds: BoundDataType[];
  geometry: Array<GeometryDataType[]>;
  id: number[];
  nodes: Array<number[]>;
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