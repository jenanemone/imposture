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
    // populate the h2
    console.log("entered postRecording");
    const h2 = document.getElementById('output')
    h2.textContent = "Your Session Recordings";
    h2.classList.add('text-center', 'text-xl'); 

    // populate with plain output of recordings
    // First build UL parent and add words from current segment
    const scriptUL = document.getElementById("recording-transcripts");
    scriptUL.style.padding = "5% 20%";
    let scriptContent = "";
    segment.words.forEach(word => scriptContent += " " + word.value);

    // next create a parent li to hold a p and i
    const scriptLI = document.createElement("li");
    
    // a div inside li to hold everything 
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.justifyContent = "space-between";
    div.style.padding = "1% 0";
    div.style['align-items'] = "center";
    
    // put play and trash and p inside the div

    const scriptP = document.createElement("p");
    scriptP.textContent = `${count}: ${scriptContent}`;
    scriptP.style.width = "80%";
    if (!(count % 2)) {
        scriptP.classList.add("bg-base-100");
    }
    const scriptPlayBtn = document.createElement('i');
    scriptPlayBtn.classList.add("fa-solid", "fa-circle-play");
    const scriptTrash = document.createElement("i");
    scriptTrash.classList.add("fa-solid", "fa-trash-can");

    div.append(scriptPlayBtn,scriptP,scriptTrash);
    scriptLI.append(div);
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

function generateAnalysis (words, fillers) {
    fetch(`../routes/speech/createAnalysis?words=${words}&fillersDetected=${fillers}`)
    .then(res => res.json())
    .then(console.log(res))
    .catch(error => console.log(error))
}

function lied (event) {
    console.log(event.detail);
}