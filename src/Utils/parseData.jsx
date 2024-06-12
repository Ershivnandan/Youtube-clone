import axios from "axios";
import { parseVideoDuration } from "./parseVideoduration";

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

export const parseData = async (items) => {
  try {
    const videosIds = [];
    const channelIds = [];

    items.forEach((item, index) => {
      channelIds.push(item[index].snippet.channelId);
      videosIds.push(item[index].id.videoId);
    });

    const {
      data: { item: channelsData },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet.contentDetails&id=${channelIds.join(
        ","
      )}&key=${API_KEY}`
    );

    const parsedChannelsData = [];
    channelsData.forEach((channel) =>
      parsedChannelsData.push({
        id: channel.id,
        image: channel.snippet.thumbnails.default.url,
      })
    );

    const {
      data: { items: videosData },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videosIds.join(
        ","
      )}&key=${API_KEY}`
    );

    console.log(items, "this is items")

    const parseData = [];
    items.forEach((item, index) => {
      const { image: channelImage } = parsedChannelsData.find(
        (data) => data.id === item.snippet.channelId
      );

      if (channelImage) {
        parseData.push({
          videoId: item.id.videoId,
          videoTitle: item.snippet.title,
          videoDescription: item.snippet.description,
          viddeoThumbnail: item.snippet.thumbnails.medium.url,
          videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          videoDuration: parseVideoDuration(
            videosData[index].contentDetails.duration
          ),
          videoViews: convertRawToString(
            videosData[index].statistics.viewCount
          ),
          videoAge: timeSince(new DataTransfer(item.snippet.publishedAt)),
          channelInfo: {
            id: item.snippet.channelId,
            image: item.snippet.channelImage,
            name: item.snippet.channelTitle,
          },
        });
      }
    });
    return parseData;
  } catch (error) {
    console.log(error.message);
  }
};
