import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import parseData from "../../Utils/parseData";

// env updated 
const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
    "youtube/App/searchPageVideos",
    async(isNext,{getState}) => {
        const {
            youtubeApp : {nextPageToken : nextPageTokenFromState,videos},
        } = getState();
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q="Its Shibbu"&key=${API_KEY}&part=snippet&type=video&${
            isNext ? `pageToken=${nextPageTokenFromState}` : ""
          }`);
        const items = response.data.items;
        const parsedData = await parseData(items);

        return {parsedData:[...videos,...parsedData],nextPageToken:nextPageTokenFromState}
    }
)