import React, { useState } from 'react';
import { TemplateHandler } from 'easy-template-x';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

interface Template {
  enderecamento: string;
  processo: string;
  parte: string;
  data: string;
  [ḱey: string]: string;
}

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

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setTemplateFile(event.target.files[0]);
    }
  };

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
      <h1>Habilite-se</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea quisquam
        consectetur obcaecati quidem officiis a tempore dolores, neque.
      </p>
      <input type='file' onChange={onChangeFile} />
      <button onClick={generateDocs}>Gerar petições</button>
    </>
  );
};

export default App;
