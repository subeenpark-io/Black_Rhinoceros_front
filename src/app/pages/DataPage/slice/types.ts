import { Elements } from 'react-flow-renderer';

type Option = { text: string; value: string };

interface IForm {
  formType: 'input' | 'select' | 'upload' | 'multiSelect';
  label: string;
  value: string | string[];
  options: Option[];
}

type ModuleName =
  | 'splitData'
  | 'linearRegression'
  | 'logisticRegression'
  | 'data';

export interface DatapageState {
  elements: Elements;
  resultId: string | null;
  loading: boolean;
  error: Error | null;
  parameterForm: Record<ModuleName, IForm> | null;
}
