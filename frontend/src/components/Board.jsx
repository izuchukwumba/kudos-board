import { useState } from "react";
import "../styles/Board.css";
import { deleteBoard } from "../../api";
import BoardDetails from "./BoardDetails";

function Board(props) {
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const handleDeleteBoard = async () => {
    try {
      await deleteBoard(props.id);
      setIsDeleteClicked(false);
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="Board" onClick={props.onBoardClick}>
      <img src={props.image} alt="kudos board" className="board-image" />

      <div className="board-texts-container">
        <div className="board-title">{props.title}</div>
        <div className="board-2nd-texts-container">
          <div>
            <div className="board-category">{props.category}</div>
            <div className="board-author">
              by {props.author} at{" "}
              <span className="board-createdAt">
                {props.createdAt.substring(11, 16)}
              </span>
            </div>
          </div>
          <div className="board-btn-container">
            <div className="board-btn board-btn-view">View Board</div>
            <div
              className="board-btn board-btn-delete"
              onClick={(event) => {
                setIsDeleteClicked(true), event.stopPropagation();
              }}
            >
              <i class="fa-solid fa-trash"></i>
            </div>
          </div>
        </div>
      </div>

      <div
        className="delete-confirmation-modal-overlay"
        style={{ display: isDeleteClicked ? "block" : "none" }}
        onClick={() => setIsDeleteClicked(false)}
      >
        <div
          className="delete-confirmation-modal"
          onClick={(event) => event.stopPropagation()}
        >
          <div
            className="close-modal-btn"
            onClick={() => setIsDeleteClicked(false)}
          >
            &times;
          </div>
          <div className="delete-confirmation-first-line">
            You are about to delete a kudos board
          </div>
          <div className="delete-confirmation-second-line">
            You cannot undo this action
          </div>
          <div className="delete-confirmation-third-line">Continue?</div>
          <div className="delete-confirmation-btns">
            <div
              onClick={() => {
                props.onBoardDelete(), setIsDeleteClicked(false);
              }}
            >
              Yes, please
            </div>
            <div onClick={() => setIsDeleteClicked(false)}>No, thank you</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
