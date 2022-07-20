import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

export interface FileJson {
  [key: string]: string;
}

interface IProps {
  fileJson: FileJson[];
}

const Columns: React.FC<IProps> = ({ fileJson }) => {
  const [allColumns, setAllColumns] = useState<string[]>([]);
  const [enderecamento, setEnderecamento] = useState<string | null>(null);
  const [processo, setProcesso] = useState<string | null>(null);
  const [parte, setParte] = useState<string | null>(null);

  useEffect(() => {
    setAllColumns(Array.from(Object.keys(fileJson[0])));
  }, [fileJson]);

  const onChangeEnderecamento = (_: unknown, newValue: string | null) => {
    setEnderecamento(newValue);
  };

  const onChangeProcesso = (_: unknown, newValue: string | null) => {
    setProcesso(newValue);
  };

  const onChangeParte = (_: unknown, newValue: string | null) => {
    setParte(newValue);
  };

  const columnSection = (
    sectionTitle: string,
    value: string | null,
    onChange: (e: unknown, v: string | null) => void
  ) => {
    return (
      <>
        <Autocomplete
          disablePortal
          size='small'
          options={allColumns}
          value={value}
          onChange={(event, newValue) => onChange(event, newValue)}
          renderInput={(params) => (
            <TextField {...params} label={sectionTitle} />
          )}
        />
      </>
    );
  };

  return (
    <>
      {columnSection('Endereçamento', enderecamento, onChangeEnderecamento)}
      {columnSection('Número do processo', processo, onChangeProcesso)}
      {columnSection('Parte contrária', parte, onChangeParte)}
    </>
  );
};

export default Columns;
