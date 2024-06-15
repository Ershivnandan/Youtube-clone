import axios from "axios";
import parseVideoDuration from "./parseVideoduration";
import convertRawtoString from "./convertRawToStrings";
import timeSince from "./timeSince";

const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;

const parseRecommendedData = async (items) => {
  try {
    const videoIds = [];
    const channelIds = [];

    for (let i = 0; i < items.length; i++) {
      const { snippet, contentDetails } = items[i];
      if (snippet && contentDetails && contentDetails.upload) {
        channelIds.push(snippet.channelId);
        videoIds.push(contentDetails.upload.videoId);
      }
    }

    const channelResponse = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelIds.join(
        ","
      )}&key=${API_KEY}`
    );

    const channelsData = channelResponse.data.items || [];

    const parsedChannelsData = [];
    for (let i = 0; i < channelsData.length; i++) {
      const channel = channelsData[i];
      parsedChannelsData.push({
        id: channel.id,
        image: channel.snippet.thumbnails.default.url,
      });
    }

    const videoResponse = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );

    const videosData = videoResponse.data.items || [];

    const parseData = [];
    for (let i = 0; i < items.length; i++) {
      const { snippet, contentDetails } = items[i];
      const channelData = parsedChannelsData.find(
        (data) => data.id === snippet.channelId
      );
      if (snippet && contentDetails && channelData) {
        parseData.push({
          videoId: contentDetails.upload.videoId,
          videoTitle: snippet.title,
          videoDescription: snippet.description,
          videoThumbnail: snippet.thumbnails.medium.url,
          videoLink: `https://www.youtube.com/watch?v=${contentDetails.upload.videoId}`,
          videoDuration: parseVideoDuration(
            videosData[i]?.contentDetails?.duration
          ),
          videoViews: convertRawtoString(
            videosData[i]?.statistics?.viewCount
          ),
          videoAge: timeSince(new Date(snippet.publishedAt)),
          channelInfo: {
            id: snippet.channelId,
            image: channelData.image,
            name: snippet.channelTitle,
          },
        });
      }
    }
    return parseData;


  } catch (err) {
    console.error("Error parsing recommended data:", err);
    return [];
  }
};

export default parseRecommendedData;
