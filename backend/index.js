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
  const allBoards = await prisma.Board.findMany();
  res.status(200).json(allBoards);
});

app.get("/boards/:id", async (req, res) => {
  const { id } = req.params;
  const boardToGet = await prisma.Board.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.status(200).json(boardToGet);
});

//create boards
app.post("/boards/", async (req, res) => {
  const { image, title, category, cards } = req.body;
  const boardToCreate = await prisma.Board.create({
    data: { image, title, category, cards },
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
      id: parseInt(boardId),
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
  const { image, title, description, author } = req.body;
  const cardToUpdate = await prisma.Card.update({
    where: {
      id: parseInt(cardId),
    },
    data: {
      image,
      title,
      description,
      author,
      boardId: parseInt(boradId),
    },
  });
  res.status(200).json(card);
});

//delete cards
app.delete("/boards/:boardId/cards/:cardId", async (req, res) => {
  const boradId = req.params.boardId;
  const cardId = req.params.cardId;
  const card = await prisma.Card.delete({
    where: {
      id: parseInt(cardId),
    },
  });
  res.status(200).json(card);
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
