import { useQuery } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { BalanceSheet } from '@modules/balance-sheet';
import { mockBalanceSheetReport } from '@modules/balance-sheet/BalanceSheet.mocks.ts';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('BalanceSheet', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render loading status', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isPending: true, error: null, data: undefined,
    });

    render(<BalanceSheet />);
    expect(useQuery).toHaveBeenCalled();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText(/Please contact us if the problem persists/)).toBe(null);
    expect(screen.queryByTestId('balance-sheet-table')).toBe(null);
  });

  it('should render error if API request failed', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false, error: new Error('Request Failed!'), data: undefined,
    });

    render(<BalanceSheet />);
    expect(useQuery).toHaveBeenCalled();
    expect(screen.queryByText('Loading...')).toBe(null);
    expect(screen.getByText(/Failed to load report data/)).toBeInTheDocument();
    expect(screen.queryByTestId('balance-sheet-table')).toBe(null);
  });

  it('should render error if API returned empty data', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false, error: null, data: { rows: [] },
    });

    render(<BalanceSheet />);
    expect(useQuery).toHaveBeenCalled();
    expect(screen.queryByText('Loading...')).toBe(null);
    expect(screen.getByText(/Report data is empty/)).toBeInTheDocument();
    expect(screen.queryByTestId('balance-sheet-table')).toBe(null);
  });

  it('should render data on successful request', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false, error: null, data: mockBalanceSheetReport,
    });

    render(<BalanceSheet />);
    expect(useQuery).toHaveBeenCalled();
    expect(screen.queryByText('Loading...')).toBe(null);
    expect(screen.queryByText(/Please contact us if the problem persists/)).toBe(null);
    expect(screen.queryByText(mockBalanceSheetReport.title)).toBeInTheDocument();
    expect(screen.queryByText(mockBalanceSheetReport.organisation)).toBeInTheDocument();
    expect(screen.queryByText(mockBalanceSheetReport.subTitle)).toBeInTheDocument();
    expect(screen.getByTestId('balance-sheet-table')).toBeInTheDocument();
  });
});
