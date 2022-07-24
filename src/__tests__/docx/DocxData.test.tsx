import { render, screen } from '@testing-library/react';
import DocxData from '../../components/docx/DocxData';

describe('DocxData component tests', () => {
  const labelText = 'Escolha uma petição para servir de modelo';

  test('DocxData renders', () => {
    render(<DocxData setTemplateFile={jest.fn()} />);
    const p = screen.getByText(labelText);
    expect(p).toBeInTheDocument();
  });
});
