function ImagePopup({ card, onClose, isImagePopupOpened }) {
  return (
    <div
      className={`popup popup_type_expand ${isImagePopupOpened ? "popup_opened" : ""}`}
      id="popupExpand"
    >
      <div className="popup__container popup__container_expand">
        <div className="popup__container-info">
          <button
            onClick={onClose}
            className="popup__close-button popup__close-button_type_expand"
            type="button"
            aria-label="Закрыть"
          ></button>
          <img
            className="popup__image-expand"
            src={card.link}
            alt={card.name}
          />
          <h2 className="popup__text-expand">{card.name}</h2>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
