const ImagePopup = ({ card, onClose }) => {
  return (
    <div
      className={`popup popup_type_full-image ${card ? "popup_opened" : ""}`}
    >
      {card && (
        <div className="popup__container">
          <div className="popup__content">
            <figure className="popup__figure">
              <img
                src={card.link}
                alt={card.name}
                className="popup__full-image"
              />
              <figcaption>
                <p className="popup__text">{card.name}</p>
              </figcaption>
            </figure>
            <button
              type="button"
              className="button button_type_close"
              onClick={onClose}
            ></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePopup;
