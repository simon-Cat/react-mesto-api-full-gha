import React from "react";
import PopupWithForm from "./PopupWithForm";

export default class EditAvatarPopup extends React.Component {
  constructor(props) {
    super(props);
    this.avatarInputRef = React.createRef();
	
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    if (!this.props.isOpen) {
      this.avatarInputRef.current.value = "";
    }
  }

  // handlers
  handleSubmit(e) {
    e.preventDefault();
    this.props.onUpdateAvatar({ avatar: this.avatarInputRef.current.value });
  }

  render() {
    return (
      <>
        <PopupWithForm
          title="Обновить аватар"
          name="avatar"
          sumbitText={'Сохранить'}
          isOpen={this.props.isOpen}
          onClose={this.props.onClose}
          onSubmit={this.handleSubmit}
        >
          <input
            ref={this.avatarInputRef}
            required
            type="url"
            name="avatar"
            id="avatar-input"
            placeholder="Ссылка на картинку"
            className="form__input form__input_type_avatar"
          />
          <span className="form__input-error avatar-input-error"></span>
        </PopupWithForm>
      </>
    );
  }
}
