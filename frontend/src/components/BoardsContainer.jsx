import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BoardsContainer.css";
import Board from "./Board";
import Header from "./Header";
import Input from "./Input";
import Footer from "./Footer";
import { getBoards, createBoards, deleteBoard } from "../../api";

function BoardsContainer() {
  const [boards, setBoards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleBoardClick = (id) => {
    navigate(`/boards/${id}`);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchBoards = async () => {
      try {
        const data = await getBoards();
        setBoards(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBoards();
  }, []);

  const handleBoardDelete = async (id) => {
    await deleteBoard(id);
    const newBoards = boards.filter((board) => board.id !== id);
    setBoards(newBoards);
  };

  //Create New Board
  const [isModalOpen, setIsModalOpen] = useState(false);
  let initialFormData = {
    author: "",
    title: "",
    category: "",
    description: "",
    image: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newBoards = await createBoards(formData);
      setBoards([...boards, newBoards]);
      setIsModalOpen(false);
    } catch (error) {
      throw error;
    }

    setFormData(initialFormData);
  };

  //Sort Boards
  const [sortOption, setSortOption] = useState("All");

  const sortBoards = async (sortString) => {
    const allBoards = boards;
    if (sortOption === "All") {
      const data = await getBoards();
      setBoards(data);
    } else if (sortOption === "Recent") {
      const data = await getBoards();
      const newBoard = [];
      for (let i = data.length - 1; i >= 0; i--) {
        newBoard.push(data[i]);
      }
      setBoards(newBoard);
    } else if (sortOption === sortString) {
      const data = await getBoards();

      const sortedBoards = await data.filter(
        (board) => board.category == sortString
      );
      setBoards([...sortedBoards]);
    } else {
      setBoards(allBoards);
    }
  };

  useEffect(() => {
    sortBoards(sortOption);
  }, [sortOption]);

  //Search
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = async (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    const data = await getBoards();

    const filteredBoard = data.filter((board) =>
      board.title.toLowerCase().includes(value.toLowerCase())
    );
    setBoards(filteredBoard);
  };
  return (
    <>
      <Header />
      <div id="Input">
        <input
          name="search"
          value={searchQuery}
          id="search-input"
          type="text"
          placeholder="Search all cards..."
          onChange={handleSearchChange}
        />
        <div id="top-btn-container">
          <div
            className="top-btn button-all"
            onClick={() => setSortOption("All")}
          >
            All
          </div>
          <div
            className="top-btn button-recent"
            onClick={() => {
              setSortOption(""), setSortOption("Recent");
            }}
          >
            Recent
          </div>
          <div
            className="top-btn button-celebration"
            onClick={() => {
              setSortOption(""), setSortOption("Celebration");
            }}
          >
            Celebration
          </div>
          <div
            className="top-btn button-thanks"
            onClick={() => {
              setSortOption(""), setSortOption("Thank You");
            }}
          >
            Thank You
          </div>
          <div
            className="top-btn button-inspiration"
            onClick={() => {
              setSortOption("Inspiration");
            }}
          >
            Inspiration
          </div>
        </div>
        <div className="button-create-card-container">
          <div
            className="button-create-card"
            onClick={() => setIsModalOpen(true)}
          >
            Create new card
          </div>
        </div>
      </div>

      <div className="BoardsContainer">
        {Array.isArray(boards) && boards.length > 0 ? (
          boards.map((board, index) => (
            <Board
              key={index}
              id={board.id}
              title={board.title}
              author={board.author}
              category={board.category}
              image={board.image}
              createdAt={board.createdAt}
              onBoardClick={() => handleBoardClick(board.id)}
              onBoardDelete={() => handleBoardDelete(board.id)}
            />
          ))
        ) : (
          <div>No boards available. {error}</div>
        )}
      </div>

      <div
        className="modal-create-board-overlay"
        style={{ display: isModalOpen ? "block" : "none" }}
        onClick={() => setIsModalOpen(false)}
      >
        <div
          className="modal-create-board"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="modal-create-board-header">
            Create New Kudos Board
          </div>
          <span
            className="close-modal-btn"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </span>
          <form className="modal-create-board-form">
            <label className="modal-input-container">
              <div>Nickname</div>
              <input
                name="author"
                type="text"
                value={formData.author}
                placeholder="Your nickname..."
                onChange={handleInputChange}
              />
            </label>
            <label className="modal-input-container">
              <div>Title</div>
              <input
                name="title"
                type="text"
                value={formData.title}
                placeholder="Board title..."
                onChange={handleInputChange}
              />
            </label>
            <label>
              <div>Category</div>
              <select
                name="category"
                id="modal-board-category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Choose category</option>
                <option value="Celebration">Celebration</option>
                <option value="Thank You">Thank You </option>
                <option value="Inspiration">Inspiration </option>
              </select>
            </label>
            <label>
              <div>Description</div>
              <input
                name="description"
                type="text"
                value={formData.description}
                placeholder="Board description..."
                onChange={handleInputChange}
              />
            </label>
            <label>
              <div>Image Url</div>
              <input
                name="image"
                type="text"
                value={formData.image}
                placeholder="Image Url..."
                onChange={handleInputChange}
              />
            </label>
            <div className="modal-btn-submit" onClick={handleSubmit}>
              Create New Board
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BoardsContainer;
