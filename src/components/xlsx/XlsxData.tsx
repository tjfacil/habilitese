import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export interface Template {
  enderecamento: string;
  processo: string;
  parte: string;
  juiz: string;
  data: string;
  [ḱey: string]: string;
}

export interface XlsxJson {
  [key: string]: string;
}

interface IProps {
  xlsxJson: XlsxJson[];
  setXlsxJson: (data: XlsxJson[]) => void;
  templateData: Template;
  setTemplateCols: (t: Template) => void;
}

const XlsxData: React.FC<IProps> = ({
  xlsxJson,
  setXlsxJson,
  templateData,
  setTemplateCols,
}) => {
  const [allColumns, setAllColumns] = useState<string[]>([]);
  const [enderecamento, setEnderecamento] = useState<string | null>(null);
  const [processo, setProcesso] = useState<string | null>(null);
  const [parte, setParte] = useState<string | null>(null);
  const [juiz, setJuiz] = useState<string | null>(null);

  useEffect(() => {
    if (xlsxJson.length > 0) {
      setAllColumns(Array.from(Object.keys(xlsxJson[0])));
    }
  }, [xlsxJson]);

  const onChangeXlsxFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet) as XlsxJson[];
    setXlsxJson(jsonData);
  };

  const onChangeEnderecamento = (_: unknown, newValue: string | null) => {
    setEnderecamento(newValue);
    const t = { ...templateData };
    t.enderecamento = newValue || '';
    setTemplateCols(t);
  };

  const onChangeProcesso = (_: unknown, newValue: string | null) => {
    setProcesso(newValue);
    const t = { ...templateData };
    t.processo = newValue || '';
    setTemplateCols(t);
  };

  const onChangeParte = (_: unknown, newValue: string | null) => {
    setParte(newValue);
    const t = { ...templateData };
    t.parte = newValue || '';
    setTemplateCols(t);
  };

  const onChangeJuiz = (_: unknown, newValue: string | null) => {
    setJuiz(newValue);
    const t = { ...templateData };
    t.juiz = newValue || '';
    setTemplateCols(t);
  };

  const columnSection = (
    sectionTitle: string,
    value: string | null,
    onChange: (e: unknown, v: string | null) => void
  ) => {
    return (
      <Autocomplete
        disablePortal
        size='small'
        options={allColumns}
        value={value}
        onChange={(event, newValue) => onChange(event, newValue)}
        renderInput={(params) => <TextField {...params} label={sectionTitle} />}
        style={{ marginBottom: '1rem' }}
        data-testid='xlsx-column'
      />
    );
  };

  return (
    <>
      <label htmlFor='xlsx-uploader'>
        <Typography variant='body1' fontWeight='bold'>
          Escolha uma planilha com os dados para preencher o modelo
        </Typography>
      </label>
      <input id='xlsx-uploader' type='file' accept='.xlsx' onChange={onChangeXlsxFile} />

      {xlsxJson.length > 0 && (
        <div style={{ marginTop: '1rem', maxWidth: '400px' }}>
          <Typography variant='body1' fontWeight='bold' marginBottom='1rem'>
            Escolha quais colunas da planilha usar
          </Typography>
          {columnSection('Número do processo', processo, onChangeProcesso)}
          {columnSection('Parte contrária', parte, onChangeParte)}
          {columnSection('Serventia', enderecamento, onChangeEnderecamento)}
          {columnSection('Juiz', juiz, onChangeJuiz)}
        </div>
      )}
    </>
  );
};

export default XlsxData;
