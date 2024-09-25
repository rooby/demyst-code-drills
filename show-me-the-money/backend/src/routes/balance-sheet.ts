import express, { NextFunction, Request, Response, Router } from 'express';
import logger from '../utils/logger';
import axios, { AxiosResponse } from 'axios';
import { BalanceSheetReport, BalanceSheetReportRow, BalanceSheetReportRowTypeUI, BalanceSheetReportUI, BalanceSheetResponse, BalanceSheetTableRowUI } from './balance-sheet.types';
import config from '../config';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const uiData: BalanceSheetReportUI = await getBalanceSheet();
    res.json(uiData);
  } catch (error) {
    next(error);
  }
});

/**
 * Get the balance sheet data from Xero and return from it the data required by the UI.
 *
 * @returns The subset of report data required for the UI.
 */
export async function getBalanceSheet(): Promise<BalanceSheetReportUI> {
  let response: AxiosResponse<BalanceSheetResponse>;

  try {
    response = await axios.get<BalanceSheetResponse>(config.xeroApiUrl);
  } catch (error) {
    logger.error(error);
    throw new Error('Failed to retrieve balance sheet data from Xero.');
  }

  try {
    // Assuming we always have a single report. In a real system we would handle zero and multiple reports.
    return processResponseReport(response.data.Reports[0]);
  } catch (error) {
    logger.error(error);
    throw new Error('Failed to process balance sheet data from Xero.');
  }
}

/**
 * Get only the data required for the UI, from the report data.
 *
 * @param report - A report object from a Xero balance sheet response.
 *
 * @returns The subset of report data required for the UI.
 */
export function processResponseReport(report: BalanceSheetReport): BalanceSheetReportUI {
  const rows: BalanceSheetTableRowUI[] = [];
  processReportRows(report.Rows, rows);
  return {
    date: report.ReportDate,
    organisation: report.ReportTitles[1],
    rows,
    subTitle: report.ReportTitles[2],
    title: report.ReportTitles[0],
  };
}

/**
 * Generate only the data required for the UI, from the report rows data.
 *
 * @param rows - An array of report row data, modified in place.
 * @param uiTableRows - The array of row data for the UI, to be populated.
 * @param sectionLevel - The curent level of section nesting we're on.
 *
 * @returns The current section level.
 */
export function processReportRows(rows: BalanceSheetReportRow[], uiTableRows: BalanceSheetTableRowUI[], sectionLevel: number = 0): number {
  rows.forEach(row => {
    if (row.RowType === 'Section') {
      sectionLevel++;
      let rowType: BalanceSheetReportRowTypeUI = sectionLevel === 1 ? 'Section' : 'SubSection';
      if (!row.Title) {
        rowType = 'EmptySection';
        sectionLevel--;
      }
      uiTableRows.push({
        rowType: rowType,
        cells: [row.Title || '\u00A0'], // A non-breaking space is used to prevent rows collapsing in the table.
      });
    } else if (row.RowType === 'SummaryRow') {
      uiTableRows.push({
        rowType: sectionLevel === 1 ? 'SectionSummary' : 'SubSectionSummary',
        cells: row.Cells?.map(cell => cell.Value) || [],
      });
      sectionLevel--;
    } else {
      uiTableRows.push({
        rowType: row.RowType,
        cells: row.Cells?.map(cell => cell.Value) || [],
      });
    }

    if (row.Rows?.length) {
      sectionLevel = processReportRows(row.Rows, uiTableRows, sectionLevel);
    }
  });

  return sectionLevel;
}

export default router;
