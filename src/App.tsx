import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FlowChartPage from "./pages/FlowChartPage";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FlowChartPage />
    </QueryClientProvider>
  );
};

export default App;
