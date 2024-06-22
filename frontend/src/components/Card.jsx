import "../styles/Card.css";
import { deleteCard } from "../../api";
import { useParams } from "react-router-dom";
import { getComments, createComment, updateCard } from "../../api";
import { useState, useEffect } from "react";

function Card(props) {
  const { boardId } = useParams();

  const [comments, setComments] = useState(props.comments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleGetComments = async (parentId, childId) => {
    setComments([]);
    const allComments = await getComments(parentId, childId);
    setComments((prev) => [...prev, allComments]);
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        await getComments(boardId, props.id);
      } catch (error) {
        throw error;
      }
    };
  }, [props.comments]);

  const handleCloseModal = (event) => {
    setIsModalOpen(false);
    event.stopPropagation();
  };
  const [newComment, setNewComment] = useState({ author: "", comment: "" });

  const handleCommentInput = async (event) => {
    const { name, value } = event.target;
    setNewComment({ ...newComment, [name]: value });
  };
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (newComment) {
      createComment(newComment, boardId, props.id);
      setComments((prev) => [...prev, newComment]);
    }
  };

  //Upvotes
  const [cardData, setCardData] = useState({
    author: props.author,
    image: props.image,
    title: props.title,
    upvotes: props.upvotes,
    description: props.description,
    createdAt: props.createdAt,
  });
  const [upvoteNumber, setUpVoteNumber] = useState(props.upvotes);
  const handleUpvote = async (event) => {
    event.stopPropagation();
    const updatedCardData = {
      ...cardData,
      upvotes: cardData.upvotes + 1,
    };
    setUpVoteNumber((prev) => prev + 1);
    try {
      await updateCard(updatedCardData, boardId, props.id);
    } catch (error) {
      throw error;
    }
  };
  return (
    <div
      className="Card"
      onClick={() => {
        handleGetComments(boardId, props.id), setIsModalOpen(true);
      }}
    >
      <img src={props.image} alt={props.title} className="card-image" />
      <div className="card-texts">
        <div className="card-title">{props.title}</div>
        <div className="card-author">
          by {props.author} on&nbsp;
          <span className="card-time">
            {new Date(props.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="card-description">{props.description}</div>
        <div>
          {upvoteNumber}&nbsp;
          <span onClick={handleUpvote}>
            <i
              className={`${
                upvoteNumber <= 0 ? "fa-regular" : "fa-solid"
              } fa-heart`}
              style={{ color: upvoteNumber <= 0 ? "black" : "red" }}
            ></i>
          </span>
          &nbsp;&nbsp;
          <span>{props.comments?.length} Comments</span>
        </div>
        <div className="card-btns">
          <div
            className="add-view-comments"
            // onClick={() => setIsModalOpen(true)}
          >
            Add/View Comment
          </div>

          <div onClick={props.onDelete} className="delete-card">
            Delete Card
          </div>
        </div>
      </div>
      <div
        className="card-details-modal-overlay"
        style={{ display: isModalOpen && "block" }}
        onClick={(event) => handleCloseModal(event)}
      >
        <div
          className="card-details-modal"
          onClick={(event) => event.stopPropagation()}
        >
          <div
            onClick={(event) => handleCloseModal(event)}
            className="close-card-details close-modal-btn"
          >
            &times;
          </div>
          <div className="card-details-top">
            <img
              src={props.image}
              alt={props.title}
              className="card-details-image"
              width="200px"
            />
            <div>
              <div>{props.title}</div>
              <div className="card-author">
                by {props.author} on&nbsp;
                <span className="card-time">
                  {new Date(props.createdAt).toLocaleString()}
                </span>
              </div>

              <div>{props.upvotes} upvotes</div>
            </div>
          </div>
          <div>
            Comments
            {Array.isArray(comments) && comments.length > 0 ? (
              props.comments.map((comment, index) => (
                <div>
                  <div key={index}>{comment.comment}</div>
                </div>
              ))
            ) : (
              <div>{""}</div>
            )}
            Author
            <input
              name="author"
              type="text"
              value={newComment.author}
              onChange={handleCommentInput}
              placeholder="Type Comment"
            />
            Add Comment
            <input
              name="comment"
              type="text"
              value={newComment.comment}
              onChange={handleCommentInput}
              placeholder="Type Comment"
            />
            <div onClick={handleCommentSubmit}>Submit</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
