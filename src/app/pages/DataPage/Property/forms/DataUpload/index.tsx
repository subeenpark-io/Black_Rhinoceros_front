import React, { useEffect } from 'react';
import Label from 'app/components/Label';
import { useDataUploadSlice } from './slice';
import { useAppDispatch, useAppSelector } from 'app/hooks/useRedux';

// upload form 은 데이터베이스 id 를 value 에 저장한다.
const DataUpload = ({ value, label, onParamsChange }) => {
  const { actions } = useDataUploadSlice();
  const dispatch = useAppDispatch();
  const { datasetId } = useAppSelector(state => state.dataUpload);

  useEffect(() => {
    if (datasetId && datasetId.length > 0) {
      onParamsChange({ label, value: datasetId });
    }

    return () => {
      dispatch(actions.resetDatasetId());
    };
  }, [datasetId]);

  return (
    <>
      <Label htmlFor={label}>{label}</Label>
      <input
        type={'file'}
        accept={'.csv'}
        name={label}
        onChange={e => {
          const files = e.target.files;

          if (files && files[0]) {
            const formData = new FormData();
            formData.append('dataset', files[0]);
            dispatch(actions.postDatasetRequest(formData));
          }
        }}
      />
    </>
  );
};

export default DataUpload;
