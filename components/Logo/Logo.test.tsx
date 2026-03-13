import { render, screen } from '@testing-library/react';
import Logo from './Logo';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('Logo component', () => {
  it('renders logo image', () => {
    render(<Logo />);

    const img = screen.getByAltText('TIVIT Almaviva Group');

    expect(img).toBeInTheDocument();
  });

  it('uses default size md', () => {
    const { container } = render(<Logo />);

    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass('logo--md');
  });

  it('applies sm size', () => {
    const { container } = render(<Logo size="sm" />);

    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass('logo--sm');
  });

  it('applies lg size', () => {
    const { container } = render(<Logo size="lg" />);

    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass('logo--lg');
  });

  it('applies additional className', () => {
    const { container } = render(<Logo className="custom-logo" />);

    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass('custom-logo');
  });

  it('sets correct image dimensions for md size', () => {
    render(<Logo size="md" />);

    const img = screen.getByAltText('TIVIT Almaviva Group');

    expect(img).toHaveAttribute('width', '160');
    expect(img).toHaveAttribute('height', String(Math.round(160 * 0.35)));
  });

  it('sets correct image dimensions for sm size', () => {
    render(<Logo size="sm" />);

    const img = screen.getByAltText('TIVIT Almaviva Group');

    expect(img).toHaveAttribute('width', '100');
  });
});