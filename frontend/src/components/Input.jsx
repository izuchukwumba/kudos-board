import "../styles/Input.css";

function Input() {
  return (
    <div id="Input">
      <input id="search-input" type="text" placeholder="Search all cards..." />
      <div id="top-btn-container">
        <div className="top-btn button-all">All</div>
        <div className="top-btn button-recent">Recent</div>
        <div className="top-btn button-celebration">Celebration</div>
        <div className="top-btn button-thanks">Thank You</div>
        <div className="top-btn button-inspiration">Inspiration</div>
      </div>
      <div className="button-create-card">Create new card</div>
    </div>
  );
}

export default Input;
