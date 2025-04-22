import React from "react";
import "./style.css";

const NotFound: React.FC = () => {
  return (
    <>
      <h1 className="text-black">We are sorry ....</h1>
      <h2 className="text-black subheader">
        Unfortunatelly, we can't show anything right now.
      </h2>
      <p className="text-black">
        If you are wondering what you should do, you might like to have a look{" "}
        <br />
        at my personal project{" "}
        <a href="https://www.servify.bg" target="_blank" rel="nofollow">
          HERE
        </a>
      </p>
    </>
  );
};

export default NotFound;
