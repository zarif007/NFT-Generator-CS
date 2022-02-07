import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='/generate/:generatorId' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
