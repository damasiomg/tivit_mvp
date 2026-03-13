import { render, screen } from '@testing-library/react';
import Table from './Table';

interface User {
  id: number;
  name: string;
  role: string;
}

const columns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Nome' },
  { key: 'role', header: 'Perfil' },
] as const;

const data: User[] = [
  { id: 1, name: 'Diego', role: 'admin' },
  { id: 2, name: 'Maria', role: 'user' },
];

describe('Table component', () => {
  it('renders table headers', () => {
    render(<Table columns={columns as any} data={data as any} />);

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Perfil')).toBeInTheDocument();
  });

  it('renders table rows', () => {
    render(<Table columns={columns as any} data={data as any} />);

    expect(screen.getByText('Diego')).toBeInTheDocument();
    expect(screen.getByText('Maria')).toBeInTheDocument();
  });

  it('renders custom cell using render function', () => {
    const customColumns = [
      { key: 'name', header: 'Nome' },
      {
        key: 'role',
        header: 'Perfil',
        render: (value: string) => <span data-testid="custom-role">{value.toUpperCase()}</span>,
      },
    ];

    render(<Table columns={customColumns as any} data={data as any} />);

    const customCells = screen.getAllByTestId('custom-role');

    expect(customCells).toHaveLength(2);
    expect(customCells[0]).toHaveTextContent('ADMIN');
  });

  it('renders empty message when data is empty', () => {
    render(<Table columns={columns as any} data={[]} emptyMessage="Sem resultados" />);

    expect(screen.getByText('Sem resultados')).toBeInTheDocument();
  });

  it('renders default empty message when none is provided', () => {
    render(<Table columns={columns as any} data={[]} />);

    expect(screen.getByText('Nenhum dado encontrado')).toBeInTheDocument();
  });

  it('sets data-label attribute correctly', () => {
    render(<Table columns={columns as any} data={data as any} />);

    const cell = screen.getByText('Diego');

    expect(cell).toHaveAttribute('data-label', 'Nome');
  });

  it('renders empty string when value is undefined', () => {
    const partialData = [{ id: 1, name: undefined, role: 'user' }];

    render(<Table columns={columns as any} data={partialData as any} />);

    const cells = screen.getAllByRole('cell');

    expect(cells.length).toBeGreaterThan(0);
  });
});