import React, { createContext, useState } from "react";

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState("ANKARA");
  const [selectedCity2, setSelectedCity2] = useState("İSTANBUL");

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
