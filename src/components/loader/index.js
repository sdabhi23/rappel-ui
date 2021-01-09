import { Icon } from "semantic-ui-react";
import "./index.css";

function Loader() {
  return (
    <div id="loader-main">
      <div id="loader"></div>
      <Icon name="github" size="huge" />
    </div>
  );
}

export default Loader;
