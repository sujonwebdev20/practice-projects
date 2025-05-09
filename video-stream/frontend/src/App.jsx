import { useRef } from "react";
import videojs from "video.js";
import VideoPlayer from "./VideoPlayer";

const App = () => {
  const playerRef = useRef(null);

  const videoLink =
    "http://localhost:8000/uploads/courses/f9bf3be8-f501-4de7-85ef-9953dc11e561/index.m3u8";

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <>
      <div>Rest of app here</div>
      <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      <div>Rest of app here</div>
    </>
  );
};

export default App;
