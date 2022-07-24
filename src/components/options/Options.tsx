import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { getCourtsData } from './request';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export interface IOptions {
  court: string;
  instancia: string;
}

interface IProps {
  options: IOptions;
  setOptions: (o: IOptions) => void;
}

const Options: React.FC<IProps> = ({ options, setOptions }) => {
  const [courts, setCourts] = useState<string[]>([]);
  const [selectedCourt, setselectedCourt] = useState<string | null>(null);
  const [instancia, setInstancia] = useState<string>('');

  useEffect(() => {
    const getCourts = async () => {
      const display: string[] = [];
      const courtsData = await getCourtsData();
      for (const court of courtsData) {
        display.push(`${court.abbr} - ${court.name}`);
      }
      display.sort();
      setCourts(display);
    };
    getCourts();
  }, []);

  const onCourtChange = (_: unknown, newValue: string | null) => {
    setselectedCourt(newValue);
    const opts = { ...options };
    opts.court = newValue?.split(' - ')[1] || '';
    setOptions(opts);
  };

  const onInstanciaChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value.toString();
    setInstancia(newValue);
    const opts = { ...options };
    opts.instancia = newValue;
    setOptions(opts);
  };

  return (
    <>
      <p>Options</p>
      {courts.length > 0 && (
        <Autocomplete
          disablePortal
          size='small'
          options={courts}
          value={selectedCourt}
          onChange={onCourtChange}
          renderInput={(params) => <TextField {...params} label='Tribunal' />}
        />
      )}

      <FormControl>
        <InputLabel id='instancia-label'>Instância</InputLabel>
        <Select
          labelId='instancia-label'
          id='instancias-select'
          value={instancia}
          label='Instância'
          onChange={onInstanciaChange}
        >
          <MenuItem value={1}>Primeira</MenuItem>
          <MenuItem value={2}>Segunda</MenuItem>
          <MenuItem value={3}>Superior</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default Options;
