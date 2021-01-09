import { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Message, Form, Header, Icon, Modal } from "semantic-ui-react";

import constants from "../../constants";

class Login extends Component {
  state = {
    username: "",
    password: "",
    statusCode: 0,
    loading: false,
    registerSuccess: false,
    registerError: false,
    registerErrorMessage: "",
    open: false,
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    this.setState({ loading: true });
    fetch(constants.API_BASE + "auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((response) => {
        this.setState({ statusCode: response.status });
        return response.json();
      })
      .then((data) => {
        if (this.state.statusCode === 200) {
          console.log("Success!");
          localStorage.setItem(constants.STORAGE_NAME, data.token);
          this.setState({ loginSuccess: true, loading: false });
        } else {
          console.error(data);
          this.setState({
            loginError: true,
            loginErrorMessage: JSON.stringify(data),
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          loginError: true,
          loginErrorMessage: error,
          loading: false,
        });
      });
  };

  setOpen = (value) => this.setState({ open: value });

  render() {
    const {
      username,
      password,
      loading,
      loginSuccess,
      loginError,
      loginErrorMessage,
      open,
    } = this.state;

    return (
      <Modal
        basic
        dimmer="inverted"
        onClose={() => this.setOpen(false)}
        onOpen={() => this.setOpen(true)}
        open={open}
        size="small"
        trigger={
          <Button size="large" primary>
            Login
          </Button>
        }>
        <Header>
          <Icon name="users" />
          Login
        </Header>
        <Modal.Content>
          <Form
            onSubmit={this.handleSubmit}
            success={loginSuccess}
            error={loginError}>
            <Message
              success
              header="Registration Completed"
              content="You're all set to use our service!"
            />
            <Message
              error
              header="Oops! Something went wrong!"
              content={loginErrorMessage}
            />
            <Form.Input
              name="username"
              placeholder="username"
              icon="user"
              iconPosition="left"
              value={username}
              label="Username"
              onChange={this.handleChange}
              disabled={loading}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              icon="key"
              iconPosition="left"
              label="Password"
              value={password}
              onChange={this.handleChange}
              disabled={loading}
              required
            />

            <Button type="submit" color="green">
              {loading ? (
                <Icon loading name="spinner" />
              ) : (
                <Icon name="paper plane" />
              )}{" "}
              Submit
            </Button>
          </Form>
        </Modal.Content>
        {loginSuccess ? <Redirect to="/dashboard" /> : ""}
      </Modal>
    );
  }
}

export default Login;
