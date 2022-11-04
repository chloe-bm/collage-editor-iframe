import React from "react";
import { images } from "./data";

function App() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      setTimeout(() => {
        const imagesPayload = {
          type: "IMAGES",
          data: images,
        };
        const backgroundsPayload = {
          type: "BACKGROUNDS",
          data: images,
        };
        iframeRef.current!.contentWindow!.postMessage(
          JSON.stringify(imagesPayload),
          "*"
        );
        iframeRef.current!.contentWindow!.postMessage(
          JSON.stringify(backgroundsPayload),
          "*"
        );
      }, 1500);
    }
  }, [iframeRef.current]);

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <iframe
        ref={iframeRef}
        style={{ height: "100vh", width: "100vw", border: "none" }}
        src="http://localhost:5173/"
      />
    </div>
  );
}

export default App;
