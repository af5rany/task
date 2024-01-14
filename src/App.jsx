import { useState } from "react";
import Shops from "./components/Shops/Shops";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Shops></Shops>
    </>
  );
}

export default App;
