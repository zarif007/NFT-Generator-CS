import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import Generator from './Components/Generator/Generator';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='generate/:generatorId' element={<Generator />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
