import React from 'react';
import CheckBox from './CheckBox';
import StarRating from './StarRating';

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
                <div className="rating-container">
                    <StarRating rating={data.rating} onRatingChange={handleRating} />
                </div>
            </div>
        </li>
    );
}
