import { WagmiConfig } from "wagmi";
import { config } from "./wagmi";
import { Connect } from "./Connect";
import { SendForm } from "./SendForm";

function App() {
  return (
    <WagmiConfig config={config}>
      <Connect />
      <SendForm />
    </WagmiConfig>
  );
}

export default App;
