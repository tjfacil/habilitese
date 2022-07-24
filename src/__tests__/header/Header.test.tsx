import { render, screen } from '@testing-library/react';
import Header from '../../components/header/Header';

describe('Header component tests', () => {
  test('Header renders', () => {
    render(<Header />);

    const title = screen.getByText('Habilite-se');
    expect(title).toBeInTheDocument();
    const p = screen.getByText('Crie petições de habilitação processual em segudos direto do seu navegador');
    expect(p).toBeInTheDocument();
  });
});