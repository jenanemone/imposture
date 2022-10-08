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
        //showRecordings();
        window.postMessage({ type: "speechhandled", success: true }, "*");
        postRecording(segment);
    }
}

// async function showRecordings() {
//     console.log("triggered showRecordings")
//     const parent = document.querySelector('body');
//     const section = document.createElement("section");
//     section.classList.add("sessions");
//     parent.append(section);
//     const title = "Your Session Recordings";
//     const h2 = document.createElement('h2');
//     h2.textContent = title;
//     h2.classList.add("text-center");
//     section.append(h2);
// }

function postRecording(segment) {
    console.log("entered postRecording");
    // const scriptUL = document.getElementById("recording-transcripts");
    // const title = "Your Session Recordings";
    // // const transcripts = document.getElementById('transcripts');
    // const h2 = document.getElementById('output');
    // // h2.classList.add('text-center');
    // h2.textContent = title;
    // // transcripts.append(h2);
    // let scriptContent = "";
    // segment.words.forEach(word => scriptContent += " " + word.value);
    // const scriptLI = document.createElement("li");
    
    // scriptLI.textContent = `Recording ${count}: ${scriptContent}`;
    // const scriptPlay = document.createElement('i');
    // scriptPlay.classList.add("fa-solid");
    // scriptPlay.classList.add("fa-circle-play");
    // scriptLI.appendChild(scriptPlay, scriptLI);
    // //scriptUL.append(scriptLI);
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

function generateAnalysis (words, fillers) {
    fetch(`../routes/speech/createAnalysis?words=${words}&fillersDetected=${fillers}`)
    .then(res => res.json())
    .then(console.log(res))
    .catch(error => console.log(error))
}

function lied (event) {
    console.log(event.detail);
}