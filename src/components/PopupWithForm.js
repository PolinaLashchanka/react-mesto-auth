import React from "react";

function PopupWithForm(props) {
  const classPopupOpened = "popup_opened";
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? classPopupOpened : ""
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          id={props.name}
          className={`form popup__form_type_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="button form__submit-button" type="submit">
            {(props.buttonName || "Сохранить") + (props.isLoading ? "..." : "")}
          </button>
        </form>
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

export default PopupWithForm;
