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
      <label htmlFor='docx-uploader'>
        <Typography variant='body1' fontWeight='bold'>
          Escolha uma petição para servir de modelo
        </Typography>
      </label>
      <input
        id='docx-uploader'
        type='file'
        accept='.doc,.docx'
        onChange={onChangeTemplateFile}
      />
    </>
  );
};

export default DocxData;
