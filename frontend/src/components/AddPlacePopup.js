import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      title={"Добавить место"}
      name={"item"}
      buttonText={"Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Название"
        required
        className="form__input form__input_type_title"
        id="place-input"
        value={name}
        onChange={handleChangeName}
      />
      <span id="place-input-error" className="form__input-error"></span>
      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        className="form__input form__input_type_link"
        id="url-input"
        value={link}
        onChange={handleChangeLink}
      />
      <span id="profession-input-error" className="url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
