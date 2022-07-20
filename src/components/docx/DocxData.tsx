import Typography from '@mui/material/Typography';

interface IProps {
  setTemplateFile: (value: File | undefined) => void;
}

const DocxData: React.FC<IProps> = ({ setTemplateFile }) => {
  const onChangeTemplateFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setTemplateFile(event.target.files[0]);
    }
  };

  return (
    <>
      <Typography variant='body1'>
        Escolha uma petição para servir de modelo.
      </Typography>
      <input type='file' onChange={onChangeTemplateFile} />
    </>
  );
};

export default DocxData;
