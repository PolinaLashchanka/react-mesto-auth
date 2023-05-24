import React from "react";

function Authorisation(props) {
  return (
    <div className="authorisation">
      <div className="authorisation__container">
        <h2 className="authorisation__title">{props.title}</h2>
        <form
          id="authorisation"
          className="authorisation__form"
          name="authorisation"
          onSubmit={props.handleSubmit}
        >
          <input
            id="email"
            className="authorisation__form-item"
            name="email"
            type="email"
            autoComplete="email"
            value={props.email}
            onChange={props.handleChange}
            placeholder="Email"
            required
          />
          <input
            id="password"
            className="authorisation__form-item"
            name="password"
            type="password"
            autoComplete="password"
            value={props.password}
            onChange={props.handleChange}
            placeholder="Пароль"
            required
          />
          <button
            className="button authorisation__form_submit-button"
            type="submit"
          >
            {props.buttonName}
          </button>
        </form>
        {props.children}
      </div>
    </div>
  );
}

export default Authorisation;
