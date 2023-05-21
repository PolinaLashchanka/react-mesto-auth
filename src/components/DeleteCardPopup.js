import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({isOpen, onClose, onSubmit, isLoading}) {
  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonName="Да"
      isOpen={isOpen}
      isClose={onClose}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
}

export default DeleteCardPopup;
