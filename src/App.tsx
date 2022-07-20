import React, { useState } from 'react';
import { TemplateHandler } from 'easy-template-x';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import Grid from '@mui/material/Grid';
import XlsxData, { Template } from './components/xlsx/XlsxData';
import DocxData from './components/docx/DocxData';
import Header from './components/header/Header';

const DATA: Template[] = [
  {
    enderecamento: 'Juiz 1',
    processo: 'Processo 1',
    parte: 'Parte 1',
    data: 'Data 1',
  },
  {
    enderecamento: 'Juiz 2',
    processo: 'Processo 2',
    parte: 'Parte 2',
    data: 'Data 2',
  },
  {
    enderecamento: 'Juiz 3',
    processo: 'Processo 3',
    parte: 'Parte 3',
    data: 'Data 3',
  },
];

const App = () => {
  const [templateFile, setTemplateFile] = useState<File | undefined>(undefined);
  const [data, setData] = useState<Template[]>([]);

  const generateDocs = async () => {
    const zip = new JSZip();
    for (const rowData of DATA) {
      const handler = new TemplateHandler();
      if (templateFile) {
        const doc = await handler.process(templateFile, rowData);
        const filename = `${rowData.processo}.docx`;
        zip.file(filename, doc);
      }
    }
    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'tjfacil.zip');
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid item xs={6}>
          <DocxData setTemplateFile={setTemplateFile} />
        </Grid>

        <Grid item xs={6}>
          <XlsxData data={data} setData={setData} />
        </Grid>

        <Grid item xs={12}>
          <button onClick={generateDocs}>Gerar petições</button>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
