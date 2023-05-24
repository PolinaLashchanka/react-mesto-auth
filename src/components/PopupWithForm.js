import React from "react";

function PopupWithForm({
  isOpen,
  isClose,
  name,
  title,
  buttonName,
  children,
  onSubmit,
  isLoading,
}) {
  const classPopupOpened = "popup_opened";
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? classPopupOpened : ""}`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          id={name}
          className={`form popup__form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button className="button form__submit-button" type="submit">
            {(buttonName || "Сохранить") + (isLoading ? "..." : "")}
          </button>
        </form>
        <button
          className="button popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={isClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
