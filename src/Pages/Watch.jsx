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
        <div className="max-h-screen overflow-hidden flex flex-col lg:flex-row">
          <div className="flex-1 relative">
            <Navbar />
            <div className="p-4">
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                frameBorder="0"
                width="100%"
                height="502"
                className="rounded-2xl w-full"
                allowFullScreen
                title="Youtube Player"
              ></iframe>
              <div className="mt-4">
                <h1 className="text-2xl font-semibold text-white">
                  {currentPlaying?.videoTitle}
                </h1>
                <p className="text-sm text-gray-400 mt-2">
                  {currentPlaying?.videoDescription}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 w-full lg:relative right-0 top-20 p-4 bg-gray-900 lg:bg-transparent">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Recommended Videos
            </h2>
            {recommendedVideo && recommendedVideo.length > 0 ? (
              recommendedVideo.map((video) => (
                <div
                  key={video.videoId}
                  className="mb-4 cursor-pointer"
                  onClick={() => navigate(`/watch/${video.videoId}`)}
                >
                  <img
                    src={video.videoThumbnail}
                    alt={video.videoTitle}
                    className="w-full rounded-lg mb-2"
                  />
                  <div className="text-white">
                    <h3 className="text-base font-medium line-clamp-2">
                      {video.videoTitle}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                      <img
                        src={video.channelInfo.image}
                        alt={video.channelInfo.name}
                        className="rounded-full w-8 h-8"
                      />
                      {video.channelInfo.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {video.videoViews} views • {video.videoAge}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No recommended videos available</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Watch;
