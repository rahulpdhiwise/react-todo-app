import React, { Component } from 'react';
import CheckBox from './CheckBox';
import StarRating from './StarRating';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRating = this.handleRating.bind(this);
    }
    
    handleChange(checked) {
        this.props.changeStatus(this.props.data.id, checked);
    }
    
    handleRating(rating) {
        this.props.changeRating(this.props.data.id, rating);
    }
    
    render() {
        const {data} = this.props;
        const className = 'todo-item ui-state-default ' + (data.completed === true ? 'completed' : 'pending');
        
        return (
            <li className={className}>
                <div className="todo-item-content">
                    <div className="checkbox">
                        <label>
                            <CheckBox checked={data.completed} onChange={this.handleChange}/> {data.text}
                        </label>
                    </div>
                    <div className="rating-container">
                        <StarRating rating={data.rating} onRatingChange={this.handleRating} />
                    </div>
                </div>
            </li>
        );
    }
}

export default TodoItem;
