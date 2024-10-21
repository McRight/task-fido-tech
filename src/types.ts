export type DataType = {
  id: number;
  notes: string;
  engineerId: number;
  coords: [number, number];
}[];

export type ImportedDataType = {
  mapData: {
    id: number;
    engineerId: number;
    status: string;
    startDate: string;
    endDate: string;
    information: string;
    coords: {
      lat: number;
      lng: number;
    };
  }[];
};
