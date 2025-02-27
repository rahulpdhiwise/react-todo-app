import React, { Component } from 'react';

class StarRating extends Component {
    constructor(props) {
        super(props);
        this.renderStar = this.renderStar.bind(this);
    }
    
    renderStar(starValue) {
        const { rating, onRatingChange } = this.props;
        const filled = rating >= starValue;
        return (
            <button 
                key={starValue}
                type="button"
                title={starValue + " Star"}
                className={"rating-star " + (filled ? 'filled' : 'empty')}
                onClick={function() { onRatingChange(rating === starValue ? 0 : starValue); }}
            >
                {filled ? '★' : '☆'}
            </button>
        );
    }
    
    render() {
        return (
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map(this.renderStar)}
            </div>
        );
    }
}

export default StarRating;
