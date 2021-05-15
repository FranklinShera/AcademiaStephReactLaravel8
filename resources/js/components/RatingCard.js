import React from 'react'

import  StarIcon from '.././images/star.svg';
import  HalfStarIcon from '.././images/star_half_empty.svg';
import  EmptyStarIcon from '.././images/empty_star.svg';
// import  BadgeIcon from '.././images/prize.svg';

 const RatingCard = ({cardData}) => {

    


    return (
        <div className="say-card">
                <div className="name">
                    { cardData.customerName}
                </div>

                <div className=" rate-date">
                    <div className="rate">
                       { (cardData.rating == 0) ? (
                                <img src={EmptyStarIcon} className="inline rating-star" alt="Rating Star"/> 
                       ): (cardData.rating == 0.5) ? (
                                <img src={HalfStarIcon} className="inline rating-star" alt="Rating Star"/>
                       ) : (<img src={StarIcon} className="inline rating-star" alt="Rating Star"/>) }

                        { (cardData.rating > 2) ? (
                                    <img src={StarIcon} className="inline rating-star" alt="Rating Star"/> 
                        ): (cardData.rating == 1.5) ? (
                                    <img src={HalfStarIcon} className="inline rating-star" alt="Rating Star"/>
                        ) : (<img src={EmptyStarIcon} className="inline rating-star" alt="Rating Star"/>) }

                        { (cardData.rating > 3) ? (
                                    <img src={StarIcon} className="inline rating-star" alt="Rating Star"/> 
                        ): (cardData.rating == 2.5) ? (
                                    <img src={HalfStarIcon} className="inline rating-star" alt="Rating Star"/>
                        ) : (<img src={EmptyStarIcon} className="inline rating-star" alt="Rating Star"/>) }

                        { (cardData.rating > 4) ? (
                                    <img src={StarIcon} className="inline rating-star" alt="Rating Star"/> 
                        ): (cardData.rating == 3.5) ? (
                                    <img src={HalfStarIcon} className="inline rating-star" alt="Rating Star"/>
                        ) : (<img src={EmptyStarIcon} className="inline rating-star" alt="Rating Star"/>) }

                        { (cardData.rating == 5) ? (
                                    <img src={StarIcon} className="inline rating-star" alt="Rating Star"/> 
                        ): (cardData.rating == 4.5) ? (
                                    <img src={HalfStarIcon} className="inline rating-star" alt="Rating Star"/>
                        ) : (<img src={EmptyStarIcon} className="inline rating-star" alt="Rating Star"/>) }

                        
                    </div>

                    <div className="date">{cardData.created_at}</div>
                </div>

                <div className="remarks">
                { cardData.remarks}
                </div>
         </div>

    )
}


export default RatingCard;