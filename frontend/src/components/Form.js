const Form = ({ title, name, sumbitText, className=null, onSubmit, children }) => {
  return (
    <form
      onSubmit={onSubmit}
      action="#"
      name={name}
      className={`form ${className.form}`}
    >
      <h2 className={`form__title ${className.title}`}>{title}</h2>
      {children}
      <button onSubmit={onSubmit} type="submit" className={`button button_type_submit ${className.button}`}>
        <span className={`button__text ${className['submit-text']}`}>{sumbitText}</span>
      </button>
    </form>
  );
};

export default Form;
