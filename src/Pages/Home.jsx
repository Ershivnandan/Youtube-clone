
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Hooks/useApp";
import { getHomePageVideos } from "../Store/Reducers/getHomePageVideos";
import { getSearchPageVideos } from "../Store/Reducers/getSearchPageVideos";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Components/Spinner/Spinner";
import Card from "../Components/Card/Card";

const Home = () => {
    const dispatch = useAppDispatch();
    const videos = useAppSelector((state) => state.youtubeApp.videos);
    const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

    useEffect(() => {
        if (searchTerm) {
            dispatch(getSearchPageVideos(false));
        } else {
            dispatch(getHomePageVideos(false));
        }
    }, [dispatch, searchTerm]);

    return (
        <div className='max-h-screen overflow-hidden'>
            <div>
                <Navbar />
            </div>
            <div className='flex h-full' >
                <Sidebar />
                {videos.length > 0 ? (
                    <InfiniteScroll
                        dataLength={videos.length}
                        next={() => dispatch(searchTerm ? getSearchPageVideos(true) : getHomePageVideos(true))}
                        hasMore={videos.length < 500}
                        loader={<Spinner />}
                        height={650}
                    >
                        <div className='grid gap-y-14 gap-x-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-12'>
                            {videos.map((item) => (
                                <Card data={item} key={item.videoId} />
                            ))}
                        </div>
                    </InfiniteScroll>
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    );
};

export default Home;
