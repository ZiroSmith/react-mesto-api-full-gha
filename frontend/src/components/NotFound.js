import { Link } from "react-router-dom";
import React from "react";

function NotFound() {
  return (
    <div className="notFound">
      <h2>Not Found 404</h2>
      <Link to="/sign-in" className="notFound__link">
        Вернуться на страницу входа
      </Link>
    </div>
  );
}

export default NotFound;
