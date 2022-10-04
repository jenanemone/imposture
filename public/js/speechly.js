let segment;
let count = 1;

document
    .getElementsByTagName("push-to-talk-button")[0]
    .addEventListener("speechsegment", collectRecording);

const lis = document.getElementsByTagName("li")
Array.from(lis).forEach(li => li.addEventListener("click", lied))

function collectRecording(event) {
    segment = event.detail;
    // Handle speech segment and make tentative changes to app state
    console.log("speechsegment message:", segment);
    if (segment.isFinal) {
        // Handle speech segment and make permanent changes to app state
        // Optionally show confirmation
        window.postMessage({ type: "speechhandled", success: true }, "*");
        postRecording(segment);
    }
}

function postRecording(segment) {
    const scriptUL = document.getElementById("recording-transcripts");
    let scriptContent = "";
    segment.words.forEach(word => scriptContent += " " + word.value);
    const scriptLI = document.createElement("li");
    scriptLI.textContent = `Recording ${count}: ${scriptContent}`;
    scriptUL.append(scriptLI);
    count++;
}

function analyzeSegment (segment) {
    const fillers = fetch("../routes/speech/getFillers")
    .then(res => res.json())
    .then(writeAnalysis(res))
    .catch(error => console.log(error))
}

function writeAnalysis (fillers) {
    console.log("made it to write",fillers);
}

function lied (event) {
    console.log(event.detail);
}