import React, { useState } from "react";

function Login({ handleLogin }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    const { email, password } = formValue;
    e.preventDefault();
    handleLogin(email, password).catch((e) => setErrorMessage(e));
  };

  return (
    <div className="login">
      <p className="login__welcome">Вход</p>
      <p className="login__error">{errorMessage}</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="login__input"
          required
          id="username"
          name="email"
          type="text"
          value={formValue.username}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="login__input"
          required
          id="password"
          name="password"
          type="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Пароль"
        />
        <div className="login__button">
          <button type="submit" className="login__link">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
