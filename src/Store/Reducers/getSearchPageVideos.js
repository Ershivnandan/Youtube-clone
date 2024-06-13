import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import parseData from "../../Utils/parseData";

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const getSearchPageVideos = createAsyncThunk(
    "youtubeApp/getSearchPageVideos",
    async (isNext, { getState }) => {
        const {
            youtubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
        } = getState();
        
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&maxResults=20&${
            isNext ? `pageToken=${nextPageTokenFromState}` : ""
        }`);
        
        const items = response.data.items;
        const parsedData = await parseData(items);

        return {
            parsedData: isNext ? [...videos, ...parsedData] : parsedData,
            nextPageToken: response.data.nextPageToken,
        };
    }
);
