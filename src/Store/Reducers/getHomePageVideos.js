import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from "../../Utils/parseData";

let API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
  "youtube/app/homePageVideos",
  async (isNext, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
    } = getState();
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q="drop x out"&key=${API_KEY}&part=snippet&type=video`
    );
    const items = response.data.items;
    console.log(items)

    // const parsedData = await parseData(items);
  }
);
