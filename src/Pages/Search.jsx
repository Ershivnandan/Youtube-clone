import React, { useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "../Hooks/useApp";
import Spinner from "../Components/Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Components/Card/Card";
import { useNavigate } from "react-router-dom";
import { clearVideos } from "../features/youtube/youtubeSlice"; 
import { getSearchPageVideos } from "../Store/Reducers/getSearchPageVideos";
import SearchCard from "../Components/SearchCard/SearchCard";

const Home = ()=> {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === "") navigate("/");
    else dispatch(getSearchPageVideos(false));
  }, [dispatch, navigate, searchTerm]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos.length ? (
          <div className="py-8 pl-8 flex flex-col gap-5 w-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getSearchPageVideos(true))}
              hasMore={videos.length < 500}
              loader={<Spinner />}
              height={600}
            >
              {videos.map((item) => {
                return (
                  <div className="my-5"  key={item.videoId}>
                    <SearchCard data={item} />
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
export default Home;
