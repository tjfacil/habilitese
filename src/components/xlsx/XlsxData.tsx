import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Columns, { FileJson } from './Columns';
import * as XLSX from 'xlsx';

export interface Template {
  enderecamento: string;
  processo: string;
  parte: string;
  data: string;
  [ḱey: string]: string;
}

interface IProps {
  data: Template[];
  setData: (data: Template[]) => void;
}

const defaultColsMap = {
  enderecamento: '',
  processo: '',
  parte: '',
  data: '',
};

const XlsxData: React.FC<IProps> = ({ data, setData }) => {
  const [allWorksheets, setAllWorksheets] = useState<string[]>([]);
  const [selectedWorksheet, setSelectedWorksheet] = useState<string>('');
  const [fileJson, setFileJson] = useState<FileJson[]>([]);
  const [colsMap, setColsMap] = useState<Template>(defaultColsMap);

  const handleColsChange = (colName: string, colValue: string) => {
    const xlsxCols = { ...colsMap };
    xlsxCols[colName] = colValue;
    setColsMap(xlsxCols);
  };

  const onChangeXlsxFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    setAllWorksheets(workbook.SheetNames);
    setSelectedWorksheet(workbook.SheetNames[0]);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet) as FileJson[];
    setFileJson(jsonData);
  };

  return (
    <>
      <Typography variant='body1'>
        Escolha uma planilha com os dados para preencher o modelo.
      </Typography>
      <input type='file' onChange={onChangeXlsxFile} />

      {fileJson.length > 0 && <Columns fileJson={fileJson} />}
    </>
  );
};

export default XlsxData;
