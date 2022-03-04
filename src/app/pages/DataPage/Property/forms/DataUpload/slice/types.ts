export interface DataUploadState {
  datasetId: string | null;
  loading: boolean;
  error: Error | null;
}
