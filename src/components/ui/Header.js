import React from 'react';
import InputWrapper from './InputWrapper';

export default function Header(props) {
    const { actions } = props;
    
    return (
        <header>
            <div className="header-container">
                <h1>Things To Do</h1>
                {actions && actions.logout && (
                    <button 
                        className="btn btn-sm btn-default logout-btn" 
                        onClick={actions.logout}
                    >
                        Logout
                    </button>
                )}
            </div>
            <InputWrapper {...props}/>
        </header>
    );
}
