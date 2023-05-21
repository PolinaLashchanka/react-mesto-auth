import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");
  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }
  function handleCardLinkChange(e) {
    setCardLink(e.target.value);
  }

useEffect(() => {
  setCardName("");
  setCardLink("");
}, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }
  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      isClose={onClose}
      buttonName="Создать"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        id="input-card-name"
        className="form__item form__item_card_name"
        type="text"
        value={cardName}
        onChange={handleCardNameChange}
        minLength="2"
        maxLength="30"
        name="cardName"
        placeholder="Название"
        required
      />
      <span id="input-card-name-error" className="popup__error"></span>
      <input
        id="input-card-link"
        className="form__item form__item_card_image"
        type="url"
        value={cardLink}
        onChange={handleCardLinkChange}
        name="cardImage"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="input-card-link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
