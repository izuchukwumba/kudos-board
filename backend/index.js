const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");
const express = require("express");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

//CRUD Operations For Boards

//read boards
app.get("/boards", async (req, res) => {
  const allBoards = await prisma.Board.findMany({
    include: {
      cards: {
        include: { comments: true },
      },
    },
  });
  res.status(200).json(allBoards);
});

app.get("/boards/:id", async (req, res) => {
  const { id } = req.params;
  const boardToGet = await prisma.Board.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      cards: {
        include: { comments: true },
      },
    },
  });
  res.status(200).json(boardToGet);
});

//create boards
app.post("/boards/", async (req, res) => {
  const { image, title, category, author, cards } = req.body;
  const boardToCreate = await prisma.Board.create({
    data: { image, title, category, author, cards },
  });
  res.status(201).json(boardToCreate);
});
//update boards
app.put("/boards/:id", async (req, res) => {
  const { id } = req.params;
  const { image, title, category, cards } = req.body;

  const boardToUpdate = await prisma.Board.update({
    where: {
      id: parseInt(id),
    },
    data: { image, title, category, cards },
  });
  res.status(200).json(boardToUpdate);
});
//delete boards
app.delete("/boards/:id", async (req, res) => {
  const { id } = req.params;
  const boardToDelete = await prisma.Board.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.status(200).json(boardToDelete);
});

//CRUD operations for Cards

//read cards
app.get("/boards/:boardId/cards", async (req, res) => {
  const { boardId } = req.params;
  const cards = await prisma.Card.findMany({
    where: {
      boardId: parseInt(boardId),
    },
    include: {
      comments: true,
    },
  });
  res.status(200).json(cards);
});

app.get("/boards/:boardId/cards/:cardId", async (req, res) => {
  const { boardId, cardId } = req.params;
  const card = await prisma.Card.findUnique({
    where: {
      id: parseInt(cardId),
      boardId: parseInt(boardId),
    },
    include: {
      comments: true,
    },
  });
  res.status(200).json(card);
});

//create cards
app.post("/boards/:boardId/cards", async (req, res) => {
  const boradId = req.params.boardId;
  const { image, title, description, author } = req.body;
  const cardToCreate = await prisma.Card.create({
    data: {
      image,
      title,
      description,
      author,
      boardId: parseInt(boradId),
    },
  });

  res.status(201).json(cardToCreate);
});

//update cards
app.put("/boards/:boardId/cards/:cardId", async (req, res) => {
  const boradId = req.params.boardId;
  const cardId = req.params.cardId;
  const { image, title, description, author, upvotes } = req.body;
  const cardToUpdate = await prisma.card.update({
    where: {
      id: parseInt(cardId),
    },
    data: {
      image,
      title,
      description,
      author,
      upvotes,
      boardId: parseInt(boradId),
    },
  });
  res.status(200).json(cardToUpdate);
});

//delete cards
app.delete("/boards/:boardId/cards/:cardId", async (req, res) => {
  const boardId = req.params.boardId;
  const cardId = req.params.cardId;
  const card = await prisma.card.delete({
    where: {
      id: parseInt(cardId),
    },
  });
  res.status(200).json(card);
});

//CRUD operations for Comments

//read comment
app.get("/boards/:boardId/cards/:cardId/comments", async (req, res) => {
  const { boardId, cardId } = req.params;

  try {
    const allComments = await prisma.comment.findMany({
      where: {
        cardId: parseInt(cardId),
      },
    });
    res.status(200).json(allComments);
  } catch (error) {
    throw error;
  }
});

app.get(
  "/boards/:boardId/cards/:cardId/comments/:commentId",
  async (req, res) => {
    const { cardId, commentId } = req.params;
    const comment = await prisma.Comment.findUnique({
      where: {
        id: parseInt(commentId),
        cardId: parseInt(cardId),
      },
    });
    res.status(200).json(comment);
  }
);

//create comments
app.post("/boards/:boardId/cards/:cardId/comments", async (req, res) => {
  const { cardId } = req.params;
  const { author, comment } = req.body;
  try {
    const commentToCreate = await prisma.comment.create({
      data: {
        author,
        comment,
        cardId: parseInt(cardId, 10),
      },
    });
    res.status(201).json(commentToCreate);
  } catch (error) {
    throw error;
  }
});

//update comments
app.put(
  "/boards/:boardId/cards/:cardId/comments/:commentId",
  async (req, res) => {
    const { cardId, commentId } = req.params;
    const { comment } = req.body;
    const commentToUpdate = await prisma.comment.update({
      where: {
        id: parseInt(commentId),
      },
      data: {
        comment,
        cardId: parseInt(cardId),
      },
    });
    res.status(200).json(commentToUpdate);
  }
);

//delete comments
app.delete(
  "/boards/:boardId/cards/:cardId/comments/:commentId",
  async (req, res) => {
    const cardId = req.params.cardId;
    const commentId = req.params.commentId;
    const commentToDelete = await prisma.comment.delete({
      where: {
        id: parseInt(commentId),
      },
    });
    res.status(200).json(commentToDelete);
  }
);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
