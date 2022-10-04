
document
  .getElementsByTagName("push-to-talk-button")[0]
  .addEventListener("speechsegment", (e) => {
    const segment = e.detail;
    // Handle speech segment and make tentative changes to app state
    console.log("speechsegment message:", segment);
    if (segment.isFinal) {
      // Handle speech segment and make permanent changes to app state
      // Optionally show confirmation
      window.postMessage({ type: "speechhandled", success: true }, "*");
    }
 });
