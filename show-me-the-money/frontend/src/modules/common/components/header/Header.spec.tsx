import { render, screen } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';
import { Header } from '@modules/common';

describe('Header', () => {
  it('should render the title', () => {
    render(<Header />);
    expect(screen.getByText('Show Me The Money!')).toBeInTheDocument();
  });

  it('should render the logo', () => {
    render(<Header />);
    expect(screen.getByAltText('Show Me The Money logo')).toBeInTheDocument();
  });
});
