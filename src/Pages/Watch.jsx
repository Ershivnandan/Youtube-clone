import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Hooks/useApp";
import { getVideoDetails } from "../Store/Reducers/getVideoDetails";
import { getRecommendedVideos } from "../Store/Reducers/getRecommendedVideos";
import Navbar from "../Components/Navbar/Navbar";

const Watch = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentPlaying = useAppSelector(
    (state) => state.youtubeApp.currentPlaying
  );

  const recommendedVideo = useAppSelector(
    (state) => state.youtubeApp.recommendedVideo
  );

  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id));
    } else {
      navigate("/");
    }
  }, [id, navigate, dispatch]);

  useEffect(() => {
    if (currentPlaying && id) dispatch(getRecommendedVideos(id));
  }, [currentPlaying, dispatch, id]);

  console.log(recommendedVideo);
  return (
    <>
      {currentPlaying && currentPlaying?.videoId === id && (
        <div className="max-h-screen overflow-hidden flex">
          <div className="relative w-full">
            <Navbar />
            <div className="p-4 w-3/4">
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                frameBorder="0"
                width="900"
                height="502"
                className="px-10 rounded-2xl"
                allowFullScreen
                title="Youtube Player"
              ></iframe>
            </div>
          </div>
          <div className="absolute right-10 top-20 w-1/4">
            <h2 className="text-lg font-semibold mb-4">Recommended Videos</h2>
            {recommendedVideo && recommendedVideo.length > 0 ? (
              recommendedVideo.map((video) => (
                <div key={video.channelInfo.id} className="mb-4 text-white">
                  <div
                    className="cursor-pointer"
                    onClick={() => navigate(`/watch/${video.channelInfo.id}`)}
                  >
                    <img
                      src={video.videoThumbnail}
                      alt={video.videoTitle}
                      className="w-full rounded-md"
                    />
                    <div className="mt-2">
                      <h3 className="text-sm font-semibold">{video.videoTitle}</h3>
                      <p className="text-xs  flex gap-3 py-3">
                        <img src={video.channelInfo.image} alt="image" className="rounded-full w-8 h-8" />
                        {video.channelInfo.name}</p>
                      <p className="text-xs">{video.videoViews} views</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No recommended videos available</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Watch;
