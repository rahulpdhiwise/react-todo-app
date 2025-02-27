import React, { Component } from 'react';
import PrimaryButton from './PrimaryButton';

class ButtonExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  handleClick = () => {
    this.setState({ isLoading: true });
    
    // Simulate async operation
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  }

  render() {
    return (
      <div style={{ padding: '20px' }}>
        <h3>Button Examples</h3>
        
        <div style={{ marginBottom: '10px' }}>
          <PrimaryButton 
            text="Normal Button" 
            onClick={() => alert('Button clicked!')} 
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <PrimaryButton 
            text="Loading Button" 
            onClick={this.handleClick} 
            isLoading={this.state.isLoading} 
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <PrimaryButton 
            text="Disabled Button" 
            disabled={true} 
            onClick={() => alert('This should not appear')} 
          />
        </div>
      </div>
    );
  }
}

export default ButtonExample;
