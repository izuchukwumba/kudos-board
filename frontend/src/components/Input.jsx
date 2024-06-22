import { useState } from "react";
import "../styles/Input.css";
import axios from "axios";
import { createBoards } from "../../api";
import { useBoard } from "../contexts/BoardContext";

function Input() {
  const { boards, setBoards } = useBoard();

  //Sorting
  const [sortOption, setSortOption] = useState("");

  const sortBoards = (sortString) => {
    const allBoards = boards;
    if (sortOption === sortString) {
      const sortedBoards = allBoards.filter(
        (board) => board.category == sortString
      );
      setBoards([]);
      setBoards((prev) => [...prev, ...sortedBoards]);
    } else {
    }
  };

  return (
    <div id="Input">
      <input id="search-input" type="text" placeholder="Search all cards..." />
      <div id="top-btn-container">
        <div className="top-btn button-all">All</div>
        <div className="top-btn button-recent">Recent</div>
        <div
          className="top-btn button-celebration"
          onClick={() => {
            setSortOption("Celebration"), sortBoards("Celebration");
          }}
        >
          Celebration
        </div>
        <div className="top-btn button-thanks">Thank You</div>
        <div className="top-btn button-inspiration">Inspiration</div>
      </div>
    </div>
  );
}

export default Input;
