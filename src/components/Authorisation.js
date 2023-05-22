import React from "react";
import { useState } from "react";

function Authorisation(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const { email, password} = formValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAuth({
      email,
      password
    })
  }

  return (
    <div className="authorisation">
    <div className="authorisation__container">
      <h2 className="authorisation__title">{props.title}</h2>
      <form
        id="authorisation"
        className="authorisation__form"
        name="authorisation"
        onSubmit={handleSubmit}
      >
        <input
          id="email"
          className="authorisation__form-item"
          name="email"
          type="email"
          autoComplete="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="Email"
          required  
        />
        <input
          id="password"
          className="authorisation__form-item"
          name="password"
          type="password"
          autoComplete="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Пароль"
          required  
        />
        <button className="button authorisation__form_submit-button" type="submit">
          {props.buttonName}
        </button>
      </form>
      {props.children}
    </div>
    </div>
  );
}

export default Authorisation;
