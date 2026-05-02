const API = axios.create({
  baseURL: "https://prompt2pixel.onrender.com/api",
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

export const GetPosts = async () => await API.get("/posts");
export const CreatePost = async (data) => await API.post("/posts", data);
export const GenerateImage = async (data) => await API.post("/generateImage", data);