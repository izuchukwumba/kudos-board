import { useState } from "react";
import "../styles/App.css";
import Header from "./Header";
import Input from "./Input";
import BoardsContainer from "./BoardsContainer";
import BoardDetails from "./BoardDetails";
import Card from "./Card";
import BoardContextProvider from "../contexts/BoardContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BoardContextProvider>
      <div id="App">
        <Router>
          <Routes>
            <Route path="/" element={<BoardsContainer />} />
            <Route path="/boards/:boardId" element={<BoardDetails />} />
            <Route path="/boards/:boardId/cards/:cardId" element={<Card />} />
          </Routes>
        </Router>
      </div>
    </BoardContextProvider>
  );
}

export default App;
