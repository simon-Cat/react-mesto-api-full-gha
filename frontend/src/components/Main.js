import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Main = ({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) => {
  // context
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <div className="content__profile profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser.avatar}
            alt="Автарака пользователя"
            className="profile__avatar"
          />
          <div className="profile__edit-avatar" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <div className="profile__heading">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              type="button"
              className="button button_type_edit"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="button button_type_add"
          onClick={onAddPlace}
        ></button>
      </div>
      <section className="content__places places">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
