export interface IColumnAttribute {
  name: string;
  type: string;
  isFeature: true;
}

export interface MultiSelectState {
  columnAttributes: IColumnAttribute[] | null;
  loading: boolean;
  error: Error | null;
}
