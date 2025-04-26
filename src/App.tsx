import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FlowChart from "./components/FlowChart";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={"h-screen w-screen"}>
        <FlowChart />
      </div>
    </QueryClientProvider>
  );
};

export default App;
