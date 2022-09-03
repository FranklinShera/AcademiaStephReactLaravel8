import React from "react";

// import  BadgeIcon from '.././images/prize.svg';

const RatingCard = ({ cardData }) => {
    return (
        <div className="say-card">
            <div className="name">{cardData.customer_name}</div>

            <div className=" rate-date">
                <div className="rate">
                    {cardData.rating == 0 ? (
                        <img
                            src="/storage/images/empty_star.svg"
                            className="inline rating-star"
                            alt="Rating Star"
                        />
                    ) : cardData.rating == 0.5 ? (
                        <img
                            src="/storage/images/star_half_empty.svg"
                            className="inline rating-star"
                            alt="Rating Star"
                        />
                    ) : (
                        <img
                            src="/storage/images/star.svg"
                            className="inline rating-star"
                            alt="Rating Star"
                        />
                    )}

                    {cardData.rating > 1.5 ? (
                        <img
                            src="/storage/images/star.svg"
                            className="inline rating-star"
                            alt="Rating Star"
                        />
                    ) : cardData.rating == 1.5 ? (
                        <img
                            src="/storage/images/star_half_empty.svg"
                            className="inline rating-star"
                            alt="Rating Star"
                        />
                    ) : (
                        <img
                            src="/storage/images/empty_star.svg"
                            className="inline rating-star"
                            alt="Rating Star"
                        />
                    )}

                    {cardData.rating > 2.5 ? (
                        <img
                            src="/storage/images/star.svg"
                            className="inline rating-star"
                            alt="Rating Star"
                        />
                    ) : cardData.rating == 2.5 ? (
                        <img
                            src="/storage/images/star_half_empty.svg"
                            className="inline rating-star"
                            alt="Rating Star"
                        />
                    ) : (
                        <img
                            src="/storage/images/empty_star.svg"
                            className="inline rating-star"
                            alt="Rating Star"
                        />
                    )}

                    {cardData.rating > 3.5 ? (
                        <img
                            src="/storage/images/star.svg"
                            className="inline rating-star"
                            alt="Rating Star"
                        />
                    ) : cardData.rating == 3.5 ? (
                        <img
                            src="/storage/images/star_half_empty.svg"
                            className="inline rating-star"
                            alt="Rating Star"
                        />
                    ) : (
                        <img
                            src="/storage/images/empty_star.svg"
                            className="inline rating-star"
                            alt="Rating Star"
                        />
                    )}

                    {cardData.rating > 4.5 ? (
                        <img
                            src="/storage/images/star.svg"
                            className="inline rating-star"
                            alt="Rating Star"
                        />
                    ) : cardData.rating == 4.5 ? (
                        <img
                            src="/storage/images/star_half_empty.svg"
                            className="inline rating-star"
                            alt="Rating Star"
                        />
                    ) : (
                        <img
                            src="/storage/images/empty_star.svg"
                            className="inline rating-star"
                            alt="Rating Star"
                        />
                    )}
                </div>

                <div className="date">{cardData.created_at}</div>
            </div>

            <div className="remarks">{cardData.remarks}</div>
        </div>
    );
};

export default RatingCard;
