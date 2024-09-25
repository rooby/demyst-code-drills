export interface BalanceSheetResponse {
  Status: string;
  Reports: BalanceSheetReport[];
}

export interface BalanceSheetReport {
  ReportID: string;
  ReportName: string;
  ReportType: string;
  ReportTitles: [string, string, string];
  ReportDate: string;
  UpdatedDateUTC: string,
  Rows: BalanceSheetReportRow[]
}

export interface BalanceSheetReportRow {
  RowType: BalanceSheetReportRowType;
  Title?: string;
  Cells?: BalanceSheetReportCell[];
  Rows?: BalanceSheetReportRow[];
}

export type BalanceSheetReportRowType = 'Header' | 'Row' | 'Section' | 'SummaryRow';

export interface BalanceSheetReportCell {
  Value: string;
  Attributes?: BalanceSheetReportCellAttribute[];
}

export interface BalanceSheetReportCellAttribute {
  Value: string;
  Id: string;
}

export type BalanceSheetReportRowTypeUI =
  'EmptySection'
  | 'Header'
  | 'Row'
  | 'Section'
  | 'SectionSummary'
  | 'SubSection'
  | 'SubSectionSummary';

export interface BalanceSheetReportUI {
  date: string;
  organisation: string;
  rows: BalanceSheetTableRowUI[];
  subTitle: string;
  title: string;
}

export interface BalanceSheetTableRowUI {
  rowType: BalanceSheetReportRowTypeUI;
  cells: string[];
}
