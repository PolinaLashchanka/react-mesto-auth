import React from "react";

function ImagePopup({ card, onClose }) {
  const classPopupOpened = "popup_opened";
  return (
    <div className={`popup popup_open-image ${card ? classPopupOpened : ""}`}>
      <div className="popup__image-container">
        <img className="popup__image" src={card?.link} alt="#" />
        <h2 className="popup__caption"></h2>
        <button
          className="button popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
