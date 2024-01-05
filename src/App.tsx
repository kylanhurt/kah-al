import React from "react";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi.ts";
import "./App.css";

function App() {
  return (
    <WagmiProvider config={config}>
      <div className="App">Hello</div>
    </WagmiProvider>
  );
}

export default App;
