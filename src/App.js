import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import PastePage from './pastePage/PastePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PastePage/>}></Route>
        <Route path='/:hash' element={<PastePage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
