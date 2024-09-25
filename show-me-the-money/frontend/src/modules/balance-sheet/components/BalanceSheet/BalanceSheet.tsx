import { useQuery } from '@tanstack/react-query';
import { BalanceSheetReport } from '../../BalanceSheet.types.ts';
import { BalanceSheetTable } from '@modules/balance-sheet';
import styles from './BalanceSheet.module.scss';
import { ReactElement } from 'react';
import { BALANCE_SHEET_API_URL } from '@modules/common';

function fetchBalanceSheet(): Promise<BalanceSheetReport> {
  return fetch(BALANCE_SHEET_API_URL).then(response => response.json());
}

function BalanceSheet() {
  const { isPending, error, data } = useQuery({
    queryKey: ['balanceSheet'],
    queryFn: () => fetchBalanceSheet(),
  });

  let errorMessage: string = '';
  if (error) {
    errorMessage = 'Failed to load report data. Please contact us if the problem persists.';
  } else if (!isPending && !data.rows?.length) {
    errorMessage = 'Report data is empty. Please contact us if the problem persists.';
  }

  const sectionHeader: ReactElement = (
    <div className={styles.header}>
      <h1>Balance Sheet</h1>
      {!isPending && !error && !errorMessage && <>
        <h2>{data.organisation}</h2>
        <div className="sub-title">{data.subTitle}</div>
      </>}
    </div>
  );

  return (
    <section className={styles['balance-sheet']}>
      {sectionHeader}
      {isPending && <div className={styles.loading}>Loading...</div>}
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      {!isPending && !error && !errorMessage &&
        <BalanceSheetTable rows={data.rows}></BalanceSheetTable>
      }
    </section>
  );
}

export default BalanceSheet;
