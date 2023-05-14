const Popup = ({name, isOpen, children}) => {
	return (
		<div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
			<div className="popup__container">
				{children}
			</div>
		</div>
	);
}

export default Popup;