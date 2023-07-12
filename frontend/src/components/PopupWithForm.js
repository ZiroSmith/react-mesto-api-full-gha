function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  children,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
        ></button>
        <form
          className={`form form-${name}`}
          onSubmit={onSubmit}
          name={`${name}`}
        >
          <h2 className="form__title">{`${title}`}</h2>
          {children}
          <button className="form__save-button form__submit" type="submit">{`${
            buttonText || "Сохранить"
          }`}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
