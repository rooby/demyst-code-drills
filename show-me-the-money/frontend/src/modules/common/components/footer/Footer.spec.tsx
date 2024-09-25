import { render, screen } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';
import { Footer } from '@modules/common';

describe('Footer', () => {
  it('should render the footer', () => {
    render(<Footer />);
    expect(screen.getByText('Reuben Turk - 2024')).toBeInTheDocument();
  });
});
