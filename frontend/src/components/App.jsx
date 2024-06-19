import { useState } from "react";
import "../styles/App.css";
import Header from "./Header";
import Input from "./Input";
import CardsContainer from "./BoardsContainer";

function App() {
  return (
    <div id="App">
      <Header />
      <Input />
      <CardsContainer />
    </div>
  );
}

export default App;
