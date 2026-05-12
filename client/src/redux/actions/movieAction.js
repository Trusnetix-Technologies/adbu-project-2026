import axios from "axios";
const devMode = process.env.NODE_ENV === "development";

// ======= ADD MOVIE =======
export const addMovie = async (query) => {
  if (devMode) console.log("====== ADD MOVIE ======", query);
  try {
    const response = await axios.post("/api/v1/add/movie", query);
    if (devMode) console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    if (devMode) console.log("ERROR ADDING MOVIE: ", error);
    throw { error: error.message };
  }
};

// ======= UPDATE MOVIE =======
export const updateMovie = async (query) => {
  if (devMode) console.log("====== UPDATE MOVIE ======", query);
  try {
    const response = await axios.put(`/api/v1/update/movie/${query.id}`, query);
    if (devMode) console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    if (devMode) console.log("ERROR UPDATING MOVIE: ", error);
    throw { error: error.message };
  }
};

// ======= DELETE MOVIE =======
export const deleteMovie = async (id) => {
  if (devMode) console.log("====== DELETE MOVIE ======", id);
  try {
    const response = await axios.delete(`/api/v1/delete/movie/${id}`);
    if (devMode) console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    if (devMode) console.log("ERROR DELETING MOVIE: ", error);
    throw { error: error.message };
  }
};
