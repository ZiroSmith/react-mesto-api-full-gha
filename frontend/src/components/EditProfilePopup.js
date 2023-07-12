import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"item"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Имя"
        required
        className="form__input form__input_type_name"
        id="name-input"
        onChange={handleChangeName}
        value={name || ""}
      />
      <span id="name-input-error" className="form__input-error"></span>
      <input
        type="text"
        name="job"
        placeholder="Профессия"
        required
        className="form__input form__input_type_profession"
        id="profession-input"
        onChange={handleChangeDescription}
        value={description || ""}
      />
      <span id="profession-input-error" className="form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
