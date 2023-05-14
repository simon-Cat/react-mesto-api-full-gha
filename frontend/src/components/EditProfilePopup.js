import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  // context
  const currentUser = useContext(CurrentUserContext);

  // effect
  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, isOpen]);

  // states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // handlers
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({ name, about: description });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      sumbitText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        minLength="2"
        maxLength="40"
        type="text"
        name="userName"
        className="form__input form__input_type_name"
        id="name-input"
        placeholder="Имя"
        value={name}
        onChange={handleChangeName}
      />
      <span className="form__input-error name-input-error"></span>
      <input
        required
        minLength="2"
        maxLength="200"
        type="text"
        name="userPost"
        className="form__input form__input_type_post"
        id="post-input"
        placeholder="О себе"
        value={description}
        onChange={handleChangeDescription}
      />
      <span className="form__input-error post-input-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
