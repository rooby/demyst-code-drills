export type BalanceSheetReportRowType =
  'EmptySection'
  | 'Header'
  | 'Row'
  | 'Section'
  | 'SectionSummary'
  | 'SubSection'
  | 'SubSectionSummary';

export interface BalanceSheetReport {
  date: string;
  organisation: string;
  rows: BalanceSheetRowData[];
  subTitle: string;
  title: string;
}

export interface BalanceSheetRowData {
  rowType: BalanceSheetReportRowType;
  cells: string[];
}
