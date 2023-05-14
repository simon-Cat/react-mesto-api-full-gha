import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  // states
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  // effect
  useEffect(() => {
    if (!isOpen) {
      setPlaceName("");
      setPlaceLink("");
    }
  }, [isOpen]);

  // handlers
  const handleNameChange = (e) => {
    setPlaceName(e.target.value);
  };
  const handleLinkChange = (e) => {
    setPlaceLink(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({ name: placeName, link: placeLink });
  };

  return (
    <>
      <PopupWithForm
        title="Новое место"
        name="add"
        sumbitText={'Сохранить'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          required
          minLength="2"
          maxLength="30"
          type="text"
          name="name"
          id="place-name-input"
          placeholder="Название"
          className="form__input form__input_type_place-name"
          value={placeName}
          onChange={handleNameChange}
        />
        <span className="form__input-error place-name-input-error"></span>
        <input
          required
          type="url"
          name="link"
          id="place-source-input"
          placeholder="Ссылка на картинку"
          className="form__input form__input_type_place-source"
          value={placeLink}
          onChange={handleLinkChange}
        />
        <span className="form__input-error place-source-input-error"></span>
      </PopupWithForm>
    </>
  );
};

export default AddPlacePopup;
