import "../styles/Board.css";

function Board() {
  return (
    <div className="Board">
      <img src="" alt="kudos board" className="board-image" />
      <div className="board-texts-container">
        <div className="board-title">Happy Birthday Jane</div>
        <div className="category">Celebration</div>
        <div className="board-btn-container">
          <div className="board-btn board-btn-view">View Board</div>
          <div className="board-btn board-btn-delete">Delete Board</div>
        </div>
      </div>
    </div>
  );
}

export default Board;
