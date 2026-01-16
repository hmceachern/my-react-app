
import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { ParseExcel } from "./Components/ParseExcel";
import SpellList from "./Components/SpellList";
import BuffCounter from "./Components/BuffCounter";
import SpellDetail from "./Components/SpellDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/parse-excel" element={<ParseExcel />}/>
      <Route path="/pathfinder-spells" element={<SpellList />}/>
      <Route path="/buff-counter" element={<BuffCounter />}/>
      <Route path= "/spell/:spellName" element={<SpellDetail />} /> // Generic item route
    </Routes>
  );
}

export default App;