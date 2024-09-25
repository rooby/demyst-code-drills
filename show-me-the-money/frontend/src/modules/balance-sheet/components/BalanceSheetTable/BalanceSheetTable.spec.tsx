import { render, screen } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';
import { BalanceSheetTable } from '@modules/balance-sheet';
import { mockBalanceSheetReport } from '@modules/balance-sheet/BalanceSheet.mocks.ts';

describe('BalanceSheetTable', () => {
  it('should render the table', () => {
    render(<BalanceSheetTable rows={mockBalanceSheetReport.rows} />);
    expect(screen.getByText('Assets')).toBeInTheDocument();
    expect(screen.getByText('Current Assets')).toBeInTheDocument();
    expect(screen.getByText('Total Assets')).toBeInTheDocument();
    expect(screen.getByText('Stock in Hand')).toBeInTheDocument();
    expect(screen.getByText('Liabilities')).toBeInTheDocument();
    expect(screen.getByText('783134.03')).toBeInTheDocument();
    expect(screen.getByText('1711934.03')).toBeInTheDocument();
    expect(screen.getByText('1925983.63')).toBeInTheDocument();
    expect(screen.getByText('Current Liabilities')).toBeInTheDocument();
    expect(screen.getByText('Total Liabilities')).toBeInTheDocument();
    expect(screen.getByText('CBA Loan')).toBeInTheDocument();
    expect(screen.getAllByText('-1111.00').length).toBe(2);
    expect(screen.getByText('Equity')).toBeInTheDocument();
    expect(screen.getByText('Total Equity')).toBeInTheDocument();
    expect(screen.getByText('Current Year Earnings')).toBeInTheDocument();
    expect(screen.getByText('1035260.39')).toBeInTheDocument();
    expect(screen.getAllByText('1437514.89').length).toBe(2);
  });

  it('should not render an empty table', () => {
    render(<BalanceSheetTable rows={[]} />);
    expect(screen.queryByTestId('balance-sheet-table')).toBe(null);
  });
});
