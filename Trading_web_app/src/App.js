import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/SideBar';
import NavBar from './Components/NavBar';
import Register from './Pages/register';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Transfer_Funds from './Pages/transfer_funds';
import ConfirmAccount from './Pages/confirm_account';
import Dashboard from './Pages/Dashbord';
import Login from './Pages/login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
    <Routes>
    
    
    <Route exact path="/sign_up"
          element={<Register/>}
        />
    <Route exact path="/login"
          element={<Login/>}
        />
    <Route exact path='/dashboard'
      element = {<Dashboard></Dashboard>}
    />    
    <Route exact path="/transfer_funds"
          element={<Transfer_Funds/>}
        />
    <Route exact path="/confirm"
          element={<ConfirmAccount/>}
        />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
