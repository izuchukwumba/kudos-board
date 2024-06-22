import React, { createContext, useState, useContext } from "react";

const boardContext = createContext([]);
export const useBoard = () => useContext(boardContext);

const BoardContextProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  return (
    <boardContext.Provider value={{ boards, setBoards }}>
      {children}
    </boardContext.Provider>
  );
};

export default BoardContextProvider;
