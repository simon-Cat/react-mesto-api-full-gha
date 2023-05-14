import Popup from "./Popup";
import { useNavigate } from "react-router-dom";

const InfoTooltip = ({ isOpen, onClose, popupType }) => {
  const navigate = useNavigate();
  const onCloseHandler = () => {
    onClose();
    if (!popupType) {
      navigate("/sign-in", { replace: true });
    }
  };
  return (
    <Popup name="infoTooltip" isOpen={isOpen}>
      <div className="infoTooltip">
        {popupType ? (
          <>
            <div className={`infoTooltip__icon infoTooltip__icon_type_fail`} />
            <div className="infoTooltip__text">
              Что-то пошло не так! Попробуйте еще раз.
            </div>
            <button
              type="button"
              className="button button_type_close"
              onClick={onCloseHandler}
            ></button>
          </>
        ) : (
          <>
            <div
              className={`infoTooltip__icon infoTooltip__icon_type_success`}
            />
            <div className="infoTooltip__text">
              Вы успешно зарегистрировались!
            </div>
            <button
              type="button"
              className="button button_type_close"
              onClick={onCloseHandler}
            ></button>
          </>
        )}
      </div>
    </Popup>
  );
};

export default InfoTooltip;
