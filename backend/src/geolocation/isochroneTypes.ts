interface FeatureCollection {
    type: "FeatureCollection";
    bbox: [number, number, number, number];
    features: Feature[];
    metadata: Metadata;
  }
  
  interface Feature {
    type: "Feature";
    properties: Properties;
    geometry: Geometry;
  }
  
  interface Properties {
    group_index: number;
    value: number;
    center: [number, number];
  }
  
  interface Geometry {
    type: "Polygon";
    coordinates: number[][][];
  }
  
  interface Metadata {
    attribution: string;
    service: string;
    timestamp: number;
    query: Query;
    engine: Engine;
  }
  
  interface Query {
    profile: string;
    profileName: string;
    locations: [number, number][];
    range: number[];
  }
  
  interface Engine {
    version: string;
    build_date: string;
    graph_date: string;
  }

export { FeatureCollection, Feature, Properties, Geometry, Metadata, Query, Engine }