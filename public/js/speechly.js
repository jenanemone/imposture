let segment; // contents of speech output 
let count = 1; // count of output segments
let allSegments = []; // initialize a segment container 

// event listeners
document
    .getElementsByTagName("push-to-talk-button")[0]
    .addEventListener("speechsegment", collectRecording);

const delBtns = document.querySelectorAll(".fa-trash-can");
Array.from(delBtns).forEach((btn) => btn.addEventListener("click", remRec))

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

function postRecording(segment) {
    
    // add the segment to the array
    const object = {
        id: count,
        segment: segment
    }
    allSegments.push(object)

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
    scriptP.style.padding = "1rem";
    scriptP.style.border = ".025rem solid #FF5D73";
    scriptP.style["border-radius"] = ".5rem";
    if (!(count % 2)) {
        scriptP.classList.add("bg-base-100");
    }
    const scriptPlayBtn = document.createElement('i');
    scriptPlayBtn.classList.add("fa-solid", "fa-robot");
    scriptPlayBtn.style.color = "#FF5D73";
    const scriptTrash = document.createElement("i");
    scriptTrash.classList.add("fa-solid", "fa-trash-can");
    scriptTrash.addEventListener('click',remRec)

    div.append(scriptPlayBtn,scriptP,scriptTrash);
    scriptLI.append(div);
    scriptUL.append(scriptLI);

    // add the save all button and increase the count!
    const saveBtn = document.getElementById('saveAll');
    saveBtn.classList.remove('hidden');
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

// removes recording from the temporary array
async function remRec () {
    try {
        console.log('entered remRec')
        const parent = this.parentNode; // gets the div
        const grand = parent.parentNode // gets the li
        const great = grand.parentNode; // gets the ul
        great.removeChild(grand); // removes the li
        
    } catch (err) {
        console.log(err)
    }
    
    
}