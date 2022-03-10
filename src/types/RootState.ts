// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly
import { DatapageState } from 'app/pages/DataPage/slice/types';
import { GlobalState } from 'app/pages/App/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  datapage: DatapageState;
  global: GlobalState;
}
