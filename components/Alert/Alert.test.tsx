import { render, screen, fireEvent } from '@testing-library/react';
import Alert from './Alert';

describe('Alert component', () => {
  it('renders message when provided', () => {
    render(<Alert message="Erro ao processar" />);

    const alert = screen.getByRole('alert');
    const message = screen.getByText('Erro ao processar');

    expect(alert).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it('does not render when message is empty', () => {
    const { container } = render(<Alert message="" />);

    expect(container.firstChild).toBeNull();
  });

  it('uses error type by default', () => {
    render(<Alert message="Erro" />);

    const alert = screen.getByRole('alert');

    expect(alert).toHaveClass('alert--error');
  });

  it('renders success type when specified', () => {
    render(<Alert message="Sucesso" type="success" />);

    const alert = screen.getByRole('alert');

    expect(alert).toHaveClass('alert--success');
  });

  it('renders close button when onClose is provided', () => {
    render(<Alert message="Erro" onClose={jest.fn()} />);

    const button = screen.getByRole('button', { name: /fechar/i });

    expect(button).toBeInTheDocument();
  });

  it('does not render close button when onClose is not provided', () => {
    render(<Alert message="Erro" />);

    const button = screen.queryByRole('button');

    expect(button).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();

    render(<Alert message="Erro" onClose={onClose} />);

    const button = screen.getByRole('button', { name: /fechar/i });

    fireEvent.click(button);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});