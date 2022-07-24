import { render, screen } from '@testing-library/react';
import { defaultTemplate } from '../../App';
import XlsxData from '../../components/xlsx/XlsxData';

describe('XlsxData component tests', () => {
  const labelText = 'Escolha uma planilha com os dados para preencher o modelo';
  test('XlsxData renders', () => {
    render(
      <XlsxData
        xlsxJson={[]}
        setXlsxJson={jest.fn()}
        templateData={defaultTemplate}
        setTemplateCols={jest.fn()}
      />
    );
    const p = screen.getByText(labelText);
    expect(p).toBeInTheDocument();
  });
});
