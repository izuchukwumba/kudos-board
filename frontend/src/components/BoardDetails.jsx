import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "../styles/BoardDetails.css";
import Card from "./Card";
import { getCards } from "../../api";
import Header from "./Header";
import Footer from "./Footer";

import { createCards, deleteCard } from "../../api";

function BoardDetails(props) {
  const initialCard = {
    title: "",
    image: "",
    description: "",
    author: "",
    comments: [{ author: "", comment: "" }],
  };
  const [cards, setCards] = useState([]);
  const { boardId } = useParams();

  useEffect(() => {
    const fetchCards = async (id) => {
      try {
        const data = await getCards(id);
        setCards(data);
      } catch (error) {
        throw new Error("Cards not found");
      }
    };
    boardId && fetchCards(boardId);
  }, [cards.length]);
  const initialFormData = {
    author: "",
    title: "",
    description: "",
    image: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [imageSearchQuery, setImageSearchQuery] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageSearchChange = (event) => {
    const { name, value } = event.target;
    setImageSearchQuery(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGifs([]);
    setSelectedGif("");

    try {
      const newCard = await createCards(formData, boardId);
      setIsModalOpen(false);
      setFormData(initialFormData);
      setCards((prev) => [...prev, newCard]);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteCard = async (parentID, childID) => {
    try {
      await deleteCard(parentID, childID);
      setCards((prev) => prev.filter((card) => card.id !== childID));
    } catch (error) {
      throw error;
    }
  };

  const [gifs, setGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const handleImageSearch = async () => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}=${imageSearchQuery}&limit=2&offset=0&rating=pg&lang=en&bundle=messaging_non_clips`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    try {
      setGifs([]);
      const response = await fetch(url, options);
      const data = await response.json();

      data.data.map((gif) => {
        setGifs((prev) => [...prev, gif.images.fixed_width.url]);
      });
    } catch (err) {
      console.error("error:" + err);
      return [];
    }
  };

  const handleSelectedGif = (gif_img) => {
    setSelectedGif(gif_img);
    formData.image = gif_img;
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="BoardDetails">
      <Header />
      <div className="board-details-header">{props.title}</div>
      <div
        onClick={() => setIsModalOpen(true)}
        className="board-details-create board-btn"
      >
        Create New Board
      </div>

      <div className="all-cards-container">
        {Array.isArray(cards) && cards.length > 0 ? (
          cards.map((card, index) => (
            <Card
              id={card.id}
              key={index}
              title={card.title}
              author={card.author}
              image={card.image}
              description={card.description}
              createdAt={card.createdAt}
              upvotes={card.upvotes}
              comments={card.comments}
              onDelete={() => handleDeleteCard(boardId, card.id)}
            />
          ))
        ) : (
          <div>"No cards found"</div>
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
          <div className="modal-create-board-header">Create New Kudos Card</div>
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
                placeholder="Card title..."
                onChange={handleInputChange}
              />
            </label>
            <label>
              <div>Text Messag</div>
              <input
                name="description"
                type="text"
                value={formData.description}
                placeholder="Text Messag..."
                onChange={handleInputChange}
              />
            </label>
            <label>
              <div>Image Search</div>
              <input
                name="image"
                type="text"
                value={imageSearchQuery}
                placeholder="Search for Image You Want..."
                onChange={handleImageSearchChange}
              />
              {gifs.map((gif, index) => (
                <img
                  key={index}
                  src={gif}
                  alt="card gif"
                  onClick={() => handleSelectedGif(gif)}
                />
              ))}
              <div onClick={handleImageSearch}>Search</div>
              <div>Selected Image Url</div>
              <input type="text" name="image" value={selectedGif} />
            </label>
            <div className="modal-btn-submit" onClick={handleSubmit}>
              Create New Card
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BoardDetails;
