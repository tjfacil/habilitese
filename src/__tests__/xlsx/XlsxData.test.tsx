import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  test('XlsxData accepts file upload', () => {
    const file = new File(['mock'], 'mock.xlsx', { type: 'xlsx' });
    render(
      <XlsxData
        xlsxJson={[]}
        setXlsxJson={jest.fn()}
        templateData={defaultTemplate}
        setTemplateCols={jest.fn()}
      />
    );
    const input: HTMLInputElement = screen.getByLabelText(labelText);
    userEvent.upload(input, file);
    expect(input.files![0]).toStrictEqual(file);
    expect(input.files!.item(0)).toStrictEqual(file);
    expect(input.files).toHaveLength(1);
  });
});
