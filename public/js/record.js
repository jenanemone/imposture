
// initialize elements we'll use
const recordButton = document.getElementById('recordButton');
const recordButtonImage = recordButton.firstElementChild;
const recordedAudioContainer = document.getElementById('recordedAudioContainer');
const saveAudioButton = document.getElementById('saveButton');
const discardAudioButton = document.getElementById('discardButton');
const recordingsContainer = document.getElementById('recordings');

let chunks = []; // will be used later to record audio
let mediaRecorder = null; // will be used later to record audio
let audioBlob = null; // the blob that will hold the recorded audio

function mediaRecorderDataAvailable(e) {
  chunks.push(e.data);
  console.log("pushed chunks in mediaRecorderDataAvailable");
}

function mediaRecorderStop() {
  // check if there are any previous recordings and remove them
  if (recordedAudioContainer.firstElementChild.tagName === 'AUDIO') {
    recordedAudioContainer.firstElementChild.remove();
    console.log("removed audio from mediaRecorderStop")
  }
  const audioElm = document.createElement('audio');
  audioElm.setAttribute('controls', ''); // add controls
  audioBlob = new Blob(chunks, { type: 'audio/ogg' });
  const audioURL = window.URL.createObjectURL(audioBlob);
  audioElm.src = audioURL;
  console.log("audioURL created from mediaRecorderStop", audioURL);
  // show audio
  recordedAudioContainer.insertBefore(audioElm, recordedAudioContainer.firstElementChild);
  recordedAudioContainer.classList.add('d-flex');
  recordedAudioContainer.classList.remove('d-none');
  // reset to default
  mediaRecorder = null;
  chunks = [];
}

function record() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('Your browser does not support recording!');
    console.log('record() triggered')
    return;
  }

  // browser supports getUserMedia
  // change image in button
  recordButtonImage.src = `../assets/images/${mediaRecorder && mediaRecorder.state === 'recording' ? 'microphone' : 'stop'}.png`;
  if (!mediaRecorder) {
    // start recording
    navigator.mediaDevices.getUserMedia({
      audio: true,
    })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        mediaRecorder.ondataavailable = mediaRecorderDataAvailable;
        mediaRecorder.onstop = mediaRecorderStop;
        console.log('stream stuff inside ')
      })
      .catch((err) => {
        alert(`The following error occurred: ${err}`);
        // change image in button
        recordButtonImage.src = '../assets/images/microphone.png';
      });
  } else {
    // stop recording
    mediaRecorder.stop();
  }
}

recordButton.addEventListener('click', record);

function resetRecording() {
  if (recordedAudioContainer.firstElementChild.tagName === 'AUDIO') {
    recordedAudioContainer.firstElementChild.remove();
    // hide recordedAudioContainer
    recordedAudioContainer.classList.add('d-none');
    recordedAudioContainer.classList.remove('d-flex');
  }
  audioBlob = null;
}

function playRecording(e) {
  let button = e.target;
  console.log(button);
  if (button.tagName === 'IMG') {
    // get parent button
    button = button.parentElement;
    console.log(button);
  }
  const audio = button.previousElementSibling;
  // const audio = new Audio(audioTag);
  // console.log(audio);

  if (audio && audio.tagName === 'AUDIO') {
    if (audio.paused) {
      // let playPromise = audio.play();
      // if (playPromise !== undefined) {
      //   playPromise.then(function () {
      //   }).catch(function (err) {
      //     console.log(err);
      //   })
      // }
      audio.play();
      button.firstElementChild.src = '../assets/images/pause.png';
    } else {
      audio.pause();
      button.firstElementChild.src = '../assets/images/play.png';
    }
  }
}

function createRecordingElement(file) {
  const recordingElement = document.createElement('div');
  recordingElement.classList.add('col-lg-2', 'col', 'recording', 'mt-3', 'bg-bright');
  const audio = document.createElement('audio');
  audio.src = file;
  audio.onended = (e) => {
    e.target.nextElementSibling.firstElementChild.src = '../assets/images/play.png';
  };
  recordingElement.appendChild(audio);
  const playButton = document.createElement('button');
  playButton.classList.add('play-button', 'btn', 'border', 'shadow-sm', 'text-center', 'd-block', 'mx-auto');
  const playImage = document.createElement('img');
  playImage.src = '../assets/images/play.png';
  playImage.classList.add('img-fluid');
  playButton.appendChild(playImage);
  playButton.addEventListener('click', playRecording);
  recordingElement.appendChild(playButton);
  return recordingElement;
}

// fetch recordings
async function fetchRecordings() {

  await fetch('/recordings')
    .then((response) => response.json())
    .then((response) => {
      console.log("got inside fetch")
      if (response.success && response.files) {
        recordingsContainer.innerHTML = ''; // remove all children
        response.files.forEach((file) => {
          const recordingElement = createRecordingElement('uploads' + file);
          console.log(file, recordingElement);
          const fileName = String(file);
          recordingElement.src = "uploads" + fileName;
          console.log("src",recordingElement.src);
          recordingsContainer.appendChild(recordingElement);
        });
      }
    })
    .catch((err) => {
      console.log(err)
    });
}

function saveRecording() {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.ogg');
  console.log('form data', formData);
  fetch('/record', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then(() => {
      alert('Your recording is saved');
      resetRecording();
      fetchRecordings();
    })
    .catch((err) => {
      console.log(err);
      alert('An error occurred, please try again later');
      resetRecording();
    });
}

saveAudioButton.addEventListener('click', saveRecording);

function discardRecording() {
  if (confirm('Are you sure you want to discard the recording?')) {
    // discard audio just recorded
    resetRecording();
  }
}

discardAudioButton.addEventListener('click', discardRecording);

fetchRecordings();
