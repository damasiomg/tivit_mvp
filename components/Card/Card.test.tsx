import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <p>Conteúdo do card</p>
      </Card>
    );

    const content = screen.getByText('Conteúdo do card');

    expect(content).toBeInTheDocument();
  });

  it('applies base card class', () => {
    const { container } = render(
      <Card>
        <span>Teste</span>
      </Card>
    );

    const card = container.firstChild;

    expect(card).toHaveClass('card');
  });

  it('applies additional className when provided', () => {
    const { container } = render(
      <Card className="custom-card">
        <span>Teste</span>
      </Card>
    );

    const card = container.firstChild;

    expect(card).toHaveClass('card');
    expect(card).toHaveClass('custom-card');
  });

  it('renders multiple children', () => {
    render(
      <Card>
        <span>Item 1</span>
        <span>Item 2</span>
      </Card>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});