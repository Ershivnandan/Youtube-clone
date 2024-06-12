import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    video : [],
    currentPlaying: null,
    searchTerm: "",
    searchReasults: [],
    nextPageToken: null,
    recomendedVideo: [],
};

const youtubeSlice = createSlice({
    name: "youtubeApp",
    initialState,
    reducers:{
        
    }
});


export default youtubeSlice.reducer;