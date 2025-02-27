import React, { Component } from 'react';
import TodoList from '../ui/TodoList';
import StateProvider from './StateProvider';
import KeyStrokeHandler from './KeyStrokeHandler';
import Auth from '../auth/Auth';
import { isAuthenticated, logout } from '../../services/api/auth';
import '../../assets/style/index.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            loading: true
        };
        
        this.handleAuthSuccess = this.handleAuthSuccess.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    componentDidMount() {
        // Check if user is authenticated
        this.setState({
            authenticated: isAuthenticated(),
            loading: false
        });
    }
    
    handleAuthSuccess() {
        this.setState({ authenticated: true });
    }
    
    handleLogout() {
        logout();
        this.setState({ authenticated: false });
    }
    
    render() {
        const { authenticated, loading } = this.state;
        
        if (loading) {
            return <div className="loading">Loading...</div>;
        }
        
        return (
            <div className="container">
                {authenticated ? (
                    <div className="app-authenticated">
                        <div className="logout-container">
                            <button onClick={this.handleLogout} className="logout-button">
                                Logout
                            </button>
                        </div>
                        <StateProvider>
                            <KeyStrokeHandler>
                                <TodoList />
                            </KeyStrokeHandler>
                        </StateProvider>
                    </div>
                ) : (
                    <Auth onAuthSuccess={this.handleAuthSuccess} />
                )}
            </div>
        );
    }
}

export default App;
