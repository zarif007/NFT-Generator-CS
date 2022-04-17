import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import Generator from './Components/Generator/Generator';
import Login from './Components/Authentication/Login';
import SignUp from './Components/Authentication/SignUp';
import { LoginContext } from './Contexts/LoginContext';
import { useState } from 'react';

function App() {
    const [user, setUser] = useState({});
    return (
      <div>
        <LoginContext.Provider value={{user, setUser}}>
          <Router>
            <Routes>
              <Route path='' element={<Home />} />
              <Route path='generate/:generatorId' element={<Generator />} />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<SignUp />} />
            </Routes>
          </Router>
        </LoginContext.Provider>
      </div>
    );
}

export default App;
