import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.scss';
import { Footer, Header } from '@modules/common';
import { BalanceSheet } from '@modules/balance-sheet';

const queryClient: QueryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header></Header>
      <main>
        <BalanceSheet></BalanceSheet>
      </main>
      <Footer></Footer>
    </QueryClientProvider>
  );
}

export default App;
