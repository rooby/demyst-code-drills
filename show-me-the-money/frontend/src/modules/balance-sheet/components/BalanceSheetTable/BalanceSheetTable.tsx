import { BalanceSheetTableProps } from './BalanceSheetTable.types.ts';
import { BalanceSheetReportRowType, BalanceSheetRowData } from '../../BalanceSheet.types.ts';
import styles from './BalanceSheetTable.module.scss';

const rowClasses: Record<BalanceSheetReportRowType, string> = {
  EmptySection: styles.emptySection,
  Header: '',
  Row: styles.lineItem,
  Section: styles.section,
  SectionSummary: styles.summary,
  SubSection: styles.subSection,
  SubSectionSummary: styles.subSummary,
};

function BalanceSheetTable(props: BalanceSheetTableProps) {
  if (!props.rows?.length) {
    return false;
  }

  const header: BalanceSheetRowData = props.rows[0];
  const rows: BalanceSheetRowData[] = props.rows.slice(1);
  const sectionRowTypes: BalanceSheetReportRowType[] = ['EmptySection', 'Section', 'SubSection'];

  return (
    <table data-testid="balance-sheet-table" className={styles['balance-sheet']}>
      <thead>
        <tr>
          {header.cells.map((cell, index) => (<th key={index}>{cell}</th>))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className={rowClasses[row.rowType]}>
            {row.cells.map((cell, cellIndex) => (
              <td key={cellIndex} colSpan={sectionRowTypes.includes(row.rowType) ? 3 : 1}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BalanceSheetTable;
