import React from "react";
import { images } from "./data";

function App() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const handlePublish = async (data: any) => {
    // download preview
    let a = document.createElement("a");
    a.href = data.preview;
    a.download = "collage.png";
    a.click();

    // download design as json
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(data.design));
    a.href = dataStr;
    a.download = "design.json";
    a.click();
  };

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

        window.onmessage = function (e) {
          if (typeof e.data === "string") {
            try {
              const payload = JSON.parse(e.data);
              if (payload.type === "REQUEST_PUBLISH") {
                handlePublish(payload.data);
              }
            } catch (err) {
              // console.log("COULD NOT PARSE DATA", e.data);
            }
          } else {
            // console.log("DATA RECEIVED IN CHILD", e.data);
          }
        };
      }, 1500);
    }
  }, [iframeRef.current]);

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <iframe
        ref={iframeRef}
        style={{ height: "100vh", width: "100vw", border: "none" }}
        src="https://collage-editor.vercel.app/"
      />
    </div>
  );
}

export default App;
