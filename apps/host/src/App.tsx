import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>Host · Shell Microfrontend</h1>
      <p>Pronto compondré los remotos aquí.</p>
    </main>
  );
}

export default App;
