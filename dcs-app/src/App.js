import NavbarContainer from "./components/NavbarContainer.jsx";
import {BrowserRouter} from "react-router-dom";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <NavbarContainer/>
    </BrowserRouter>
  );
}

export default App;
