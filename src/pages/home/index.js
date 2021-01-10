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

import "./index.css";
import { Redirect } from "react-router-dom";

import Register from "../../components/register";
import Login from "../../components/login";

import logo from "../../img/logo.png";
import { verifyCreds } from "../../utils";

function Home() {
  if (verifyCreds()) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="home-main">
      <div>
        <img src={logo} width="100px" height="100px" />
        <h1>Rappel</h1>
      </div>
      <div>
        <h2>
          An idea management tool
          <br /> Inspired from kanban boards and integrated with GitHub
        </h2>
      </div>
      <div>
        <Register />
        <Login />
      </div>
    </div>
  );
}

export default Home;
