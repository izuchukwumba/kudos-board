import axios from "axios";

const API_URL = "http://127.0.0.1:3000";

export const getBoards = async () => {
  try {
    const response = await axios.get(`${API_URL}/boards`);
    return response.data;
  } catch (error) {
    console.error("Error fetching boards", error);
  }
};

export const createBoards = async (boardData) => {
  try {
    const response = await axios.post(`${API_URL}/boards/`, boardData);
    return response.data;
  } catch (error) {
    console.error("Error fetching boards", error);
    throw error;
  }
};

export const deleteBoard = async (boardId) => {
  try {
    const response = await axios.delete(`${API_URL}/boards/${boardId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching boards", error);
  }
};

export const getCards = async (boardId) => {
  try {
    const response = await axios.get(`${API_URL}/boards/${boardId}/cards`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cards", error);
    throw error;
  }
};

export const createCards = async (cardData, boardId) => {
  try {
    const response = await axios.post(
      `${API_URL}/boards/${boardId}/cards`,
      cardData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching boards", error);
    throw error;
  }
};

export const updateCard = async (cardData, boardId, cardId) => {
  try {
    const response = await axios.put(
      `${API_URL}/boards/${boardId}/cards/${cardId}`,
      cardData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCard = async (boardId, cardId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/boards/${boardId}/cards/${cardId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching boards", error);
  }
};

export const getComments = async (boardId, cardId) => {
  try {
    const response = await axios.get(
      `${API_URL}/boards/${boardId}/cards/${cardId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cards", error);
    throw error;
  }
};

export const createComment = async (commentData, boardId, cardId) => {
  try {
    const response = await axios.post(
      `${API_URL}/boards/${boardId}/cards/${cardId}/comments`,
      commentData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching boards", error);
    throw error;
  }
};
