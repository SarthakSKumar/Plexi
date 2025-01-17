import React from "react";

const BackButton = ({ setCurrentScreen }) => {
  const handleButtonClick = () => {
    setCurrentScreen("home");
  };

  return (
    <button
      onClick={handleButtonClick}
      className="inline-block no-underline px-4 py-2 text-md bg-white text-black hover:bg-green-600 hover:text-white rounded-full"
    >
      &#8249;
    </button>
  );
};

export default BackButton;
