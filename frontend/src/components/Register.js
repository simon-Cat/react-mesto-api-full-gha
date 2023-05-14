import { useState } from "react";
import Form from "./Form";
import { Link } from "react-router-dom";
import * as auth from "../utils/auth";

const Register = ({ onRegister }) => {
  const [newUserData, setNewUserData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    setNewUserData({ ...newUserData, [targetName]: targetValue });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { email, password } = newUserData;
    auth
      .register(email, password)
      .then((res) => {
        onRegister(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setNewUserData({
          email: "",
          password: "",
        });
      });
  };
  return (
    <div className="register">
      <Form
        title={"Регистрация"}
        name={"register"}
        sumbitText={"Зарегистрироваться"}
        className={{
          form: "register__form",
          title: "register__title",
          button: "register__button",
          "submit-text": "register__text",
        }}
        onSubmit={handleOnSubmit}
      >
        <input
          required
          minLength="2"
          maxLength="40"
          type="email"
          name="email"
          className="form__input register__input"
          id="name-input"
          placeholder="Email"
          value={newUserData.email}
          onChange={handleOnChange}
        />
        <input
          required
          minLength="2"
          maxLength="40"
          type="password"
          name="password"
          className="form__input register__input"
          id="name-input"
          placeholder="Пароль"
          value={newUserData.password}
          onChange={handleOnChange}
        />
      </Form>
      <div className="register__is-auth">
        Уже зарегистрированы?{" "}
        <Link className="register__link" to="/sign-in">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
