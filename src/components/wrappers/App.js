import React, {Component} from 'react';
import TodoList from '../ui/TodoList';
import Login from '../ui/Login';
import StateProvider from './StateProvider';
import KeyStrokeHandler from './KeyStrokeHandler';
import {AUTH_LOGGED_IN} from '../../services/auth';

class App extends Component {
    render() {
        return (
            <StateProvider>
                {({data, actions}) => (
                    data.auth.status === AUTH_LOGGED_IN ? (
                        <KeyStrokeHandler>
                            <TodoList data={data} actions={actions} />
                        </KeyStrokeHandler>
                    ) : (
                        <Login onLogin={actions.login} />
                    )
                )}
            </StateProvider>
        );
    }
}

export default App;
