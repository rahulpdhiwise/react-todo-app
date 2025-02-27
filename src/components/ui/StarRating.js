import React from 'react';

export default function StarRating(props) {
    const { rating, onRatingChange } = props;
    
    const renderStar = (starValue) => {
        const filled = rating >= starValue;
        return (
            <button 
                key={starValue}
                type="button"
                title={`${starValue} Star`}
                className={`rating-star ${filled ? 'filled' : 'empty'}`}
                onClick={() => onRatingChange(rating === starValue ? 0 : starValue)}
            >
                {filled ? '★' : '☆'}
            </button>
        );
    };
    
    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map(renderStar)}
        </div>
    );
}
