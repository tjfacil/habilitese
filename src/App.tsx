import React, { useState } from 'react';
import { TemplateHandler } from 'easy-template-x';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import Grid from '@mui/material/Grid';
import XlsxData, { Template, XlsxJson } from './components/xlsx/XlsxData';
import DocxData from './components/docx/DocxData';
import Header from './components/header/Header';
import { getDate, getFullEnderecamento } from './utils/lib';
import Options, { IOptions } from './components/options/Options';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const defaultTemplate: Template = {
  enderecamento: '',
  processo: '',
  parte: '',
  juiz: '',
  data: '',
};

export const defaultOptions: IOptions = {
  court: '',
  instancia: '',
};

const App = () => {
  const [templateFile, setTemplateFile] = useState<File | undefined>(undefined);
  const [templateCols, setTemplateCols] = useState<Template>(defaultTemplate);
  const [xlsxJson, setXlsxJson] = useState<XlsxJson[]>([]);
  const [options, setOptions] = useState<IOptions>(defaultOptions);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateDocs = async () => {
    setIsLoading(true);
    const data = buildData();
    if (data.length > 0) {
      buildTemplates(data);
    } else {
      setIsLoading(false);
    }
  };

  const buildData = () => {
    const newData: Template[] = [];

    let lastServentia = '';
    let lastProcesso = '';
    let lastParte = '';

    for (const xlsxRow of xlsxJson) {
      let processo = xlsxRow[templateCols.processo];
      if (processo === undefined) {
        processo = lastProcesso;
      } else {
        lastProcesso = processo;
      }

      const isValid = processo.replace(/\D/g, '').length > 0;
      if (!isValid) {
        continue;
      }

      let serventia = xlsxRow[templateCols.enderecamento];
      if (serventia === undefined) {
        serventia = lastServentia;
      } else {
        lastServentia = serventia;
      }

      let parte = xlsxRow[templateCols.parte];
      if (parte === undefined) {
        parte = lastParte;
      } else {
        lastParte = parte;
      }

      const juiz = xlsxRow[templateCols.juiz] || '';
      const { court, instancia } = options;
      const enderecamento = getFullEnderecamento(
        serventia,
        court,
        instancia,
        juiz
      );
      newData.push({
        enderecamento,
        processo,
        parte: parte.toUpperCase(),
        juiz,
        data: getDate(),
      });
    }
    return newData;
  };

  const buildTemplates = async (data: Template[]) => {
    const zip = new JSZip();
    for (const dataRow of data) {
      const handler = new TemplateHandler();
      if (templateFile) {
        const doc = await handler.process(templateFile, dataRow);
        const proc = dataRow.processo.replace(/\D/g, '');
        const filename = `${proc}.docx`;
        zip.file(filename, doc);
      }
    }
    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'tjfacil.zip');
      setIsLoading(false);
    });
  };

  return (
    <>
      <Grid container spacing={2} flexDirection='column' alignItems='stretch'>
        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid item xs={12} sm={6} margin='1em auto'>
          <DocxData setTemplateFile={setTemplateFile} />
        </Grid>

        <Grid item xs={12} sm={6} margin='1em auto 0 auto'>
          <XlsxData
            xlsxJson={xlsxJson}
            setXlsxJson={setXlsxJson}
            templateData={templateCols}
            setTemplateCols={setTemplateCols}
          />
        </Grid>

        <Grid item xs={12} sm={6} margin='1em auto 0 auto'>
          <Options options={options} setOptions={setOptions} />
        </Grid>

        <Grid item xs={12} sm={6} margin='1em auto'>
          {isLoading ? (
            <Typography variant='body1'>Carregando...</Typography>
          ) : (
            <Button variant='contained' onClick={generateDocs}>
              Gerar petições
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default App;
