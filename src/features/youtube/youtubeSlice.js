import { createSlice } from "@reduxjs/toolkit";
import { getHomePageVideos } from "../../Store/Reducers/getHomePageVideos";

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
        
    },
    extraReducers: (builder) =>{
        builder.addCase(getHomePageVideos.fulfilled, (state,action)=>{
            
        })
    }
});


export default youtubeSlice.reducer;