/*
  Copyright 2021 Shrey Dabhi

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

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
