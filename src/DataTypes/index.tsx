export interface GeometryDataType {
  lat: number;
  lon: number;
}

export interface TagsDataType {
  name: string;
  gender: string;
}

export interface RoadDataType {
  geometry: Array<GeometryDataType[]>;
  tags: TagsDataType;
}

export interface GenderDataType {
  Highway_Name: string;
  Gender: string;
}

export interface MapDataType {
  width: number;
  height: number;
  translate: [number, number];
  mapScale: number;
}

export interface CitySettingsDataType {
  city: string;
  splitMapData: MapDataType;
  combinedMapData: MapDataType;
}