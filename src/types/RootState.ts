// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly
import { DataUploadState } from 'app/pages/DataPage/Property/forms/DataUpload/slice/types';
import { MultiSelectState } from 'app/pages/DataPage/Property/forms/MultiSelect/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  dataUpload: DataUploadState;
  multiSelect: MultiSelectState;
}
