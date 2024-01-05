import React from "react";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi.ts";
import "./App.css";
import { SendForm } from "./SendForm.tsx";
import { Connect } from "./Connect.tsx";

function App() {
  return (
    <WagmiProvider config={config}>
      <Connect />
      <SendForm />
    </WagmiProvider>
  );
}

export default App;
