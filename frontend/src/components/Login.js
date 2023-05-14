import { useState } from "react";
import Form from "./Form";
import * as auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    setAuthData({ ...authData, [targetName]: targetValue });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { email, password } = authData;

    if (!email || !password) {
      return;
    } else {
      auth
        .authorize(email, password)
        .then((res) => {
          onLogin(email, res.token);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() =>
          setAuthData({
            email: "",
            password: "",
          })
        );
    }
  };

  return (
    <div className="login">
      <Form
        title={"Вход"}
        name={"login"}
        sumbitText={"Войти"}
        className={{
          form: "login__form",
          title: "login__title",
          button: "login__button",
          "submit-text": "login__text",
        }}
        onSubmit={handleOnSubmit}
      >
        <input
          required
          type="email"
          name="email"
          className="form__input login__input"
          placeholder="Email"
          value={authData.email}
          onChange={handleOnChange}
        />
        <input
          required
          type="password"
          name="password"
          className="form__input login__input"
          placeholder="Пароль"
          value={authData.password}
          onChange={handleOnChange}
        />
      </Form>
    </div>
  );
};

export default Login;
