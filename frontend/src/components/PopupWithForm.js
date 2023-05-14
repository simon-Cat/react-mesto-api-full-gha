import Popup from "./Popup";
import Form from "./Form";

const PopupWithForm = ({
  title,
  name,
  sumbitText,
  isOpen,
  onClose,
  onSubmit,
  children,
}) => {
  return (
    <Popup name={name} isOpen={isOpen}>
      <Form
        title={title}
        name={name}
        sumbitText={sumbitText}
        className={"form_userAvatar popup__form"}
        onSubmit={onSubmit}
      >
        {children}
        <button
          type="button"
          className="button button_type_close"
          onClick={onClose}
        ></button>
      </Form>
    </Popup>
  );
};

export default PopupWithForm;
