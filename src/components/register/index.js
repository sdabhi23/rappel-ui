import { React, Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Message, Form, Header, Icon, Modal } from "semantic-ui-react";

import constants from "../../constants";

class Register extends Component {
  state = {
    username: "",
    email: "",
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
    fetch(constants.API_BASE + "auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
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
          this.setState({ registerSuccess: true, loading: false });
        } else {
          console.error(data);
          this.setState({
            registerError: true,
            registerErrorMessage: JSON.stringify(data),
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          registerError: true,
          registerErrorMessage: error,
          loading: false,
        });
      });
  };

  setOpen = (value) => this.setState({ open: value });

  render() {
    const {
      username,
      email,
      password,
      loading,
      registerSuccess,
      registerError,
      registerErrorMessage,
      open,
    } = this.state;

    return (
      <Modal
        basic
        dimmer="inverted"
        onClose={() => this.setOpen(false)}
        onOpen={() => this.setOpen(true)}
        open={open}
        trigger={
          <Button size="large" primary>
            Register
          </Button>
        }>
        <Header>
          <Icon name="user plus" />
          Register
        </Header>
        <Modal.Content>
          <Form
            onSubmit={this.handleSubmit}
            success={registerSuccess}
            error={registerError}>
            <Message
              success
              header="Registration Completed"
              content="You're all set to use our service!"
            />
            <Message
              error
              header="Oops! Something went wrong!"
              content={registerErrorMessage}
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
              name="email"
              type="email"
              placeholder="email@address.com"
              icon="envelope"
              iconPosition="left"
              value={email}
              label="Email Address"
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
        {registerSuccess ? <Redirect to="/onboard" /> : ""}
      </Modal>
    );
  }
}

export default Register;
