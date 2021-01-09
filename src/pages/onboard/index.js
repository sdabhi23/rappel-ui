import { useState } from "react";
import "./index.css";
import { Button, Message } from "semantic-ui-react";

import logo from "../../img/logo.png";
import Loader from "../../components/loader";
import constants from "../../constants";
import { Redirect } from "react-router-dom";
import { verifyCreds } from "../../utils";

const randomString = (length) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";
  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

const MessageError = () => (
  <Message negative>
    <Message.Header>Something went wrong!</Message.Header>
    <p>Check developer console for more details. Please try again later..</p>
  </Message>
);

function Onboard(props) {
  const [issue, setIssue] = useState(false);

  if (!verifyCreds()) {
    return <Redirect to="/" />;
  }

  if (props.location.pathname.endsWith("github")) {
    var tempURL = new URL(window.location.href);

    fetch(constants.API_BASE + "github/tokens/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage.getItem(constants.STORAGE_NAME),
      },
      body: JSON.stringify({
        code: tempURL.searchParams.get("code"),
        state: tempURL.searchParams.get("state"),
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Success!");
          props.history.replace("/dashboard");
          console.log(issue);
          return undefined;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data !== undefined) {
          console.error(data);
          setIssue(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setIssue(true);
      });

    return (
      <div className="github-main">
        <Loader />
        <h1>Processing metadata...</h1>
        {issue ? <MessageError /> : ""}
      </div>
    );
  } else {
    return (
      <div className="github-main">
        <img src={logo} width="150px" height="150px" />
        <h1>Rappel</h1>
        <h3>
          Please authorize our systems to read metadata related to your git
          repos
        </h3>
        <a
          href={`https://github.com/login/oauth/authorize?scope=${
            constants.SCOPE
          }&client_id=${constants.CLIENT_ID}&state=${randomString(
            50
          )}&redirect_uri=${constants.REDIRECT_URI}`}>
          <Button
            className="github-btn"
            size="big"
            content="Authorize GitHub"
            icon="github"
            labelPosition="left"
            secondary
          />
        </a>
      </div>
    );
  }
}

export default Onboard;
