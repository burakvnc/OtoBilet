import React, { createContext, useState } from "react";

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCity2, setSelectedCity2] = useState("");

  return (
    <CityContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        selectedCity2,
        setSelectedCity2,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};
