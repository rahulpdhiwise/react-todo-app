import React from 'react';
import CheckBox from './CheckBox';

export default function TodoItem(props) {
    const {data, changeStatus, changeRating} = props;
    const handleChange = (checked) => changeStatus(data.id, checked);
    const handleRating = (rating) => changeRating(data.id, rating);
    const className = 'todo-item ui-state-default ' + (data.completed === true ? 'completed' : 'pending');

    return (
        <li className={className}>
            <div className="todo-item-content">
                <div className="checkbox">
                    <label>
                        <CheckBox checked={data.completed} onChange={handleChange}/> {data.text}
                    </label>
                </div>
                <div className="rating-buttons">
                    <button 
                        type="button"
                        title="Thumbs Up"
                        className={"rating-button thumbs-up " + (data.rating === 'up' ? 'selected' : '')} 
                        onClick={() => handleRating(data.rating === 'up' ? null : 'up')}
                    >👍</button>
                    <button 
                        type="button"
                        title="Thumbs Down"
                        className={"rating-button thumbs-down " + (data.rating === 'down' ? 'selected' : '')} 
                        onClick={() => handleRating(data.rating === 'down' ? null : 'down')}
                    >👎</button>
                </div>
            </div>
        </li>
    );
}
