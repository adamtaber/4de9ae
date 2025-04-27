import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FlowChart from "./components/FlowChart";
import FormModal from "./components/FormModal";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={"h-screen w-screen"}>
        <FormModal />
        <FlowChart />
      </div>
    </QueryClientProvider>
  );
};

export default App;
