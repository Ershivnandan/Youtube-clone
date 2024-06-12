import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Hooks/useApp";
import { getHomePageVideos } from "../Store/Reducers/getHomePageVideos";

const Home = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  return (
    <div>
      <h1 className="bg-black text-white text-xl text-center flex justify-center">
        hello shiv
      </h1>
    </div>
  );
};

export default Home;
