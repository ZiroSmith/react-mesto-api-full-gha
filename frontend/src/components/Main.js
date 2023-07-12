import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const cardsElements = cards.map((item) => {
    return (
      <Card
        key={item._id}
        card={item}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    );
  });

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <button
            className="profile__avatar-button"
            onClick={onEditAvatar}
            type="button"
            aria-label="Изменить Аватар"
          ></button>
          <img
            className="profile__avatar-image"
            src={currentUser.avatar}
            alt="Аватар"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            onClick={onEditProfile}
            type="button"
            aria-label="Редактировать"
          ></button>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={onAddPlace}
          type="button"
          aria-label="Добавить"
        ></button>
      </section>
      <section className="elements">{cardsElements}</section>
    </main>
  );
}

export default Main;
