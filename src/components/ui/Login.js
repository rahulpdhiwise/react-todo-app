import React, { Component } from 'react';
import LoginButtonWrapper from './LoginButtonWrapper';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    
    if (!username.trim() || !password.trim()) {
      this.setState({ error: 'Username and password are required' });
      return;
    }
    
    const result = this.props.onLogin(username, password);
    if (result.status === 'error') {
      this.setState({ error: result.error });
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { username, password, error } = this.state;
    
    return (
      <div className="todolist">
        <h1>Login</h1>
        <form onSubmit={this.handleLogin}>
          {error && <div className="alert alert-info">{error}</div>}
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <LoginButtonWrapper>
            <button type="submit" className="btn btn-primary">Login</button>
          </LoginButtonWrapper>
        </form>
        <div className="info">
          <p>Demo credentials: username "demo", password "password"</p>
        </div>
      </div>
    );
  }
}
