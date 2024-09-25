import { afterEach, describe, expect, it } from '@jest/globals';
import mockAxios from 'jest-mock-axios';
import { getBalanceSheet } from './balance-sheet';
import { mockBalanceSheetReport, mockReportResponse } from './balance-sheet.mocks';
import { BalanceSheetReportUI } from './balance-sheet.types';

/**
 * For the sake of time, this is all the testing there is.
 * Additional testing could be done at the express level to cover the whole system.
 */

describe('Balance sheet route', () => {
  describe('processResponseReport', () => {
    afterEach(() => {
      mockAxios.reset();
    });

    it('should output correct UI config for valid input', async () => {
      const balanceSheetReportPromise: Promise<BalanceSheetReportUI> = getBalanceSheet();
      expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/api.xro/2.0/Reports/BalanceSheet');
      mockAxios.mockResponse({ data: mockReportResponse });
      const balanceSheetReport: BalanceSheetReportUI = await balanceSheetReportPromise;
      expect(balanceSheetReport).toEqual(mockBalanceSheetReport);
    });

    it('should throw an error if there is a service error', () => {
      const balanceSheetReportPromise: Promise<BalanceSheetReportUI> = getBalanceSheet();
      expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/api.xro/2.0/Reports/BalanceSheet');
      mockAxios.mockError(new Error('Request failed!'));

      expect(async () => {
        await balanceSheetReportPromise;
      }).rejects.toThrow(new Error('Failed to retrieve balance sheet data from Xero.'));
    });

    it('should throw an error if there is invalid report data', () => {
      const balanceSheetReportPromise: Promise<BalanceSheetReportUI> = getBalanceSheet();
      expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000/api.xro/2.0/Reports/BalanceSheet');
      mockAxios.mockResponse({ data: {} });

      expect(async () => {
        await balanceSheetReportPromise;
      }).rejects.toThrow(new Error('Failed to process balance sheet data from Xero.'));
    });
  });
});
