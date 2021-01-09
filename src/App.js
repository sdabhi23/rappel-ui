import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Onboard from "./pages/onboard";
import constants from "./constants";

function App() {
  console.log(constants);
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/onboard" component={Onboard} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
