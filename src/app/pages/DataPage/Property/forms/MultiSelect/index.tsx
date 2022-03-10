import React, { useEffect, useState } from 'react';
import Label from 'app/components/Label';
import { useAppDispatch, useAppSelector } from 'app/hooks/useRedux';
import { IChangedParams } from '../..';
import { useDatapageSlice } from 'app/pages/DataPage/slice';

export type Option = { text: string; value: string };

interface ISelect {
  label: string;
  value: any;
  options: Option[];
  onParamsChange: (changedParams: IChangedParams) => void;
}

const MultiSelect = React.forwardRef<HTMLSelectElement, ISelect>(
  (props, ref) => {
    const { value, label, options, onParamsChange } = props;
    const [_value, setValue] = useState(value);
    const [_options, setOptions] = useState(options);

    const { actions } = useDatapageSlice();
    const dispatch = useAppDispatch();

    const { datasetId, columnAttributes } = useAppSelector(
      state => state.datapage,
    );

    useEffect(() => {
      if (datasetId && datasetId.length > 0) {
        dispatch(actions.fetchColAttrsRequest({ datasetId }));
      }
    }, [datasetId]);

    useEffect(() => {
      if (columnAttributes && columnAttributes.length > 0) {
        const newOptions: Option[] = columnAttributes.map(attr => {
          return { text: attr.name, value: attr.name };
        });

        onParamsChange({ label, options: newOptions });
        setOptions(newOptions);
      }

      return () => {
        dispatch(actions.resetColAttrs());
      };
    }, [columnAttributes]);

    return (
      <>
        <Label htmlFor={label}>{label}</Label>
        <select
          name={label}
          value={_value}
          ref={ref}
          onChange={e => {
            const value = e.target.value;
            setValue(value);
            onParamsChange({ label, value: [value] });
          }}
        >
          {_options.map(({ text, value }) => (
            <option key={`option_${value}`} value={value}>
              {text}
            </option>
          ))}
        </select>
      </>
    );
  },
);
export default MultiSelect;
