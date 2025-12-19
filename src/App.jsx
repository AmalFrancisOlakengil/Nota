
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Folders from "./components/Folders/Folders";
function App() {
  return (
    <main className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/folders" element={<Folders />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
