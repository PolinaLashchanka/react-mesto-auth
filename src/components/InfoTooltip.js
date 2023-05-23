import React from "react";

function InfoTooltip(props) {
  const classPopupOpened = "popup_opened";
  return (
    <div className={`popup ${props.isOpen ? classPopupOpened : ""}`}>
      <div className="popup__container">
        <img src={props.infoPic} alt="infoPic" className="popup__info-image" />
        <h2 className="popup__message">{props.message}</h2>
        <button
          className="button popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={props.isClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
