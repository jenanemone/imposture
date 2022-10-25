let segment; // contents of speech output 
let count = 1; // count of output segments
let allSegments = []; // initialize a segment container 


// event listeners
document
    .getElementsByTagName("push-to-talk-button")[0]
    .addEventListener("speechsegment", collectRecording);

function collectRecording(event) {
    segment = event.detail;
    // Handle speech segment and make tentative changes to app state
    console.log("speechsegment message:", segment);
    if (segment.isFinal) {
        // Handle speech segment and make permanent changes to app state
        window.postMessage({ type: "speechhandled", success: true }, "*");
        postRecording(segment);
    }
}

function postRecording(segment) {

    console.log('postRecording reached...')
    // add the segment to the array
    const object = {
        count: count,
        segment: segment
    }
    allSegments.push(object)

    // upload to Mongo
    saveOneToMongo(segment);

    // populate the h2
    console.log("entered postRecording");
    const h2 = document.getElementById('output')
    h2.textContent = "Your Session Recordings";
    h2.classList.add('text-center', 'text-xl');

    // populate with plain output of recordings
    // First build UL parent and add words from current segment
    const scriptUL = document.getElementById("recording-transcripts");
    scriptUL.classList.remove('hidden');
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
    scriptPlayBtn.addEventListener('click',analyzeSegment);
    scriptPlayBtn.style.color = "#FF5D73";
    const scriptTrash = document.createElement("i");
    scriptTrash.classList.add("fa-solid", "fa-trash-can");
    scriptTrash.setAttribute("data-count", count);
    scriptTrash.addEventListener('click', remRec)

    div.append(scriptPlayBtn, scriptP, scriptTrash);
    scriptLI.append(div);
    scriptUL.append(scriptLI);

    // be able to view the practica button
    const saveBtn = document.getElementById('view');
    saveBtn.classList.remove('hidden');
    // saveBtn.addEventListener('click', saveAll)

    // increase the count
    count++;
    console.log(count, allSegments);
}


function lied(event) {
    console.log(event.detail);
}

// removes recording from the temporary array
async function remRec() {
    try {

        // remove the current object from the save array
        let toDel = this.dataset.count;
        console.log(toDel);
        toDel = +toDel;
        const entry = allSegments.find(obj => obj.count === toDel);
        const index = allSegments.indexOf(entry);
        console.log(index, entry)
        if (index === 0) {
            allSegments = allSegments.slice(1);
        } else if (index === allSegments.length - 1) {
            allSegments.slice(0, allSegments.length - 1);
        }
        else {
            let head = allSegments.slice(0, index);
            let tail = allSegments.slice(index + 1);
            allSegments = head.concat(tail);
        }

        // remove the DOM element
        const parent = this.parentNode; // gets the div
        const grand = parent.parentNode // gets the li
        const great = grand.parentNode; // gets the ul
        great.removeChild(grand); // removes the li

    } catch (err) {
        console.log(err)
    }
}

function saveOneToMongo(segment) {
    console.log(`segment`,JSON.stringify(segment))
    fetch('/practica/createPracticum', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(segment),
    })
        .then((response) => {
            console.log('Success:', response);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
