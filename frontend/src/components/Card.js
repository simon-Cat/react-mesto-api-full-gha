import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  // context
  const currentUser = useContext(CurrentUserContext);

  // variables
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((like) => like._id === currentUser._id);
  const cardLikeButtonClassName = `button button_type_like ${
    isLiked ? " button_active" : ""
  }`;

  // handlers
  const handleClick = () => {
    onCardClick(card);
  };
  const handleLikeClick = () => {
    onCardLike(card);
  };
  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <li>
      <article className="place">
        <img
          src={card.link}
          alt={card.name}
          className="place__image"
          onClick={handleClick}
        />
        {isOwn && (
          <button
            className="button button_type_remove"
            onClick={handleDeleteClick}
          ></button>
        )}
        <div className="place__heading-content">
          <h2 className="place__title">{card.name}</h2>
          <div className="place__like-panel">
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
            ></button>
            <span className="place__like-count">{card.likes.length}</span>
          </div>
        </div>
      </article>
    </li>
  );
};

export default Card;
