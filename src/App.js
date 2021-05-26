
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";


import { GlobalProvider } from "./Context/GlobalState";
import Customer from './Components/Customer';
import Bids from './Components/Bids';
function App() {
  return (
    <GlobalProvider>
      <Router>

        <Route exact path="/" component={Customer}/>
        <Switch>
        <Route exact path="/bids" component={Bids}/>

        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;

