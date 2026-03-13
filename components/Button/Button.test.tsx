import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('renders children correctly', () => {
    render(<Button>Enviar</Button>);

    const button = screen.getByRole('button', { name: /enviar/i });

    expect(button).toBeInTheDocument();
  });

  it('uses primary variant by default', () => {
    render(<Button>Enviar</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('btn--primary');
  });

  it('applies custom variant', () => {
    render(<Button variant="secondary">Enviar</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('btn--secondary');
  });

  it('applies full width class when fullWidth is true', () => {
    render(<Button fullWidth>Enviar</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('btn--full');
  });

  it('sets correct button type', () => {
    render(<Button type="submit">Enviar</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('type', 'submit');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Enviar</Button>);

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Enviar</Button>);

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });

  it('is disabled when loading', () => {
    render(<Button isLoading>Enviar</Button>);

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });

  it('shows spinner when loading', () => {
    const { container } = render(<Button isLoading>Enviar</Button>);

    const spinner = container.querySelector('.btn__spinner');

    expect(spinner).toBeInTheDocument();
  });

  it('does not render children when loading', () => {
    render(<Button isLoading>Enviar</Button>);

    const text = screen.queryByText('Enviar');

    expect(text).not.toBeInTheDocument();
  });

  it('applies additional className', () => {
    render(<Button className="custom-class">Enviar</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-class');
  });
});