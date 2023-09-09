import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import ShareInterface from "./Component/ShareInterface";
import DisplayAll from "./Component/DisplayAll";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<ShareInterface/>} path="/shareinterface"/>
          <Route element={<DisplayAll/>} path="/displayall"/>
        </Routes>
      </Router>
    </div>
    );
}

export default App;
