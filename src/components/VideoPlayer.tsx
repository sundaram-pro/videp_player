import React from 'react'

interface VideoPlayer {
  title?: string;
  urlInput: string;
  heightInput: number;
  widthInput: number;
  subtitlesInput: string; //maybe we change it later
  setQuality: any;
  videoTimeInput: number;
  setVideoTime: any;
}

const VideoPlayer = ({ title, urlInput, heightInput, widthInput, subtitlesInput, setQuality, videoTimeInput, setVideoTime }: VideoPlayer) => {


  function extractYouTubeParams(urlInput) {
    // Regular expression to match the video ID and optional time parameter
    const regex = /[?&]v=([a-zA-Z0-9_-]+).*?[&]?t=([0-9]+)s?/;

    // Execute the regex on the given URL
    const match = urlInput.match(regex);

    // If a match is found, extract the video ID and time
    if (match) {
      const videoId = match[1]; // Video ID
      const timeInSeconds = match[2] ? parseInt(match[2]) : null; // Time in seconds, if present
      return { videoId, timeInSeconds };
    }

    // Return null if no match is found
    return null;
  }

  const isYoutubeUrl = (url: string) => {
    const regex = /^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+/;
    //If you want to include the optional t=<time> part (for a timestamp):
    //const regex = /^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+(&t=[0-9]+s)?/;
    return regex.test(url);
  };

  if (isYoutubeUrl(urlInput)) {



    const { videoId, timeInSeconds } = extractYouTubeParams(urlInput);
    const newUrl = `https://www.youtube.com/embed/${videoId}`
    // return <YoutubeRenderer url={vidUrl} />;
    // <iframe src={urlInput} frameborder="0" width={widthInput} height={heightInput}></iframe>
    return (
      <iframe
        width="100%"
        className="h-[80vh]"
        height="500px"
        src={newUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    )

  }
  else {
    return (
      <div>

        <video width={widthInput} height={heightInput} controls >
          <source src={urlInput} type="video/mp4" />
        </video>

      </div>
    )
  }


}

export default VideoPlayer