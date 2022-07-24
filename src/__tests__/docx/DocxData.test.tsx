import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DocxData from '../../components/docx/DocxData';

describe('DocxData component tests', () => {
  const labelText = 'Escolha uma petição para servir de modelo';

  test('DocxData renders', () => {
    render(<DocxData setTemplateFile={jest.fn()} />);
    const p = screen.getByText(labelText);
    expect(p).toBeInTheDocument();
  });

  test('DocxData accepts file upload', () => {
    const file = new File(['mock'], 'mock.docx', { type: 'docx' });
    render(<DocxData setTemplateFile={jest.fn()} />);
    const input: HTMLInputElement = screen.getByLabelText(labelText);
    userEvent.upload(input, file);
    expect(input.files![0]).toStrictEqual(file);
    expect(input.files!.item(0)).toStrictEqual(file);
    expect(input.files).toHaveLength(1);
  });
});
