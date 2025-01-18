
import './App.css';

import Register from './Pages/register';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Transfer_Funds from './Pages/Payment/transfer_funds';
import ConfirmAccount from './Pages/confirm_account';
import Dashboard from './Pages/Trading/Dashbord';
import Login from './Pages/login';
import Portfolio from './Pages/Trading/Portfolio';
import Buy_stock from './Pages/Trading/buy_stock';
import LiveCandlestickChart from './Components/candlestickChart';

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
    <Route exact path="/portfolio"
          element={<Portfolio/>}
        />    
    <Route exact path="/"
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
    <Route exact path="/buy_stock"
          element={<Buy_stock/>}
        />
       <Route exact path="/chart"
          element={<LiveCandlestickChart/>}
        />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
