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
