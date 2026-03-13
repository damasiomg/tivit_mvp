import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {
  const defaultProps = {
    id: 'username',
    label: 'Usuário',
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders label and input', () => {
    render(<Input {...defaultProps} />);

    const label = screen.getByText('Usuário');
    const input = screen.getByLabelText('Usuário');

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('renders with initial value', () => {
    render(<Input {...defaultProps} value="diego" />);

    const input = screen.getByLabelText('Usuário') as HTMLInputElement;

    expect(input.value).toBe('diego');
  });

  it('calls onChange when typing', () => {
    const onChange = jest.fn();

    render(<Input {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText('Usuário');

    fireEvent.change(input, { target: { value: 'admin' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('admin');
  });

  it('renders placeholder', () => {
    render(<Input {...defaultProps} placeholder="Digite seu usuário" />);

    const input = screen.getByPlaceholderText('Digite seu usuário');

    expect(input).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<Input {...defaultProps} error="Campo obrigatório" />);

    const error = screen.getByText('Campo obrigatório');

    expect(error).toBeInTheDocument();
    expect(error).toHaveAttribute('role', 'alert');
  });

  it('sets aria-invalid when error exists', () => {
    render(<Input {...defaultProps} error="Erro" />);

    const input = screen.getByLabelText('Usuário');

    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('disables input when disabled prop is true', () => {
    render(<Input {...defaultProps} disabled />);

    const input = screen.getByLabelText('Usuário');

    expect(input).toBeDisabled();
  });

  it('associates error message with aria-describedby', () => {
    render(<Input {...defaultProps} error="Erro de validação" />);

    const input = screen.getByLabelText('Usuário');
    const error = screen.getByText('Erro de validação');

    expect(input).toHaveAttribute('aria-describedby', 'username-error');
    expect(error).toHaveAttribute('id', 'username-error');
  });
});