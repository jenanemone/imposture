const btn = document.querySelector('button')

/*
btn.addEventListener('click',getLocalStream)

function getLocalStream() {
    navigator.mediaDevices.getUserMedia({video: false, audio: true}).then((stream) => {
        window.localStream = stream; // A
        window.localAudio.srcObject = stream; // B
        window.localAudio.autoplay = true; // C
    }).catch((err) => {
        console.error(`you got an error: ${err}`)
    });
}


getLocalStream();
*/

// geeks for geeks
let audioIN = { audio: true };
    //  audio is true, for recording
 
    // Access the permission for use
    // the microphone
    navigator.mediaDevices.getUserMedia(audioIN)
 
      // 'then()' method returns a Promise
      .then(function (mediaStreamObj) {
 
        // Connect the media stream to the
        // first audio element
        let audio = document.querySelector('audio');
        //returns the recorded audio via 'audio' tag
 
        // 'srcObject' is a property which
        // takes the media object
        // This is supported in the newer browsers
        if ("srcObject" in audio) {
          audio.srcObject = mediaStreamObj;
        }
        else {   // Old version
          audio.src = window.URL
            .createObjectURL(mediaStreamObj);
        }
 
        // It will play the audio
        audio.onloadedmetadata = function (ev) {
 
          // Play the audio in the 2nd audio
          // element what is being recorded
          audio.play();
        };
 
        // Start record
        let start = document.getElementById('btnStart');
 
        // Stop record
        let stop = document.getElementById('btnStop');
 
        // 2nd audio tag for play the audio
        let playAudio = document.getElementById('adioPlay');
 
        // This is the main thing to recorded
        // the audio 'MediaRecorder' API
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        // Pass the audio stream
 
        // Start event
        start.addEventListener('click', function (ev) {
          mediaRecorder.start();
          // console.log(mediaRecorder.state);
        })
 
        // Stop event
        stop.addEventListener('click', function (ev) {
          mediaRecorder.stop();
          // console.log(mediaRecorder.state);
        });
 
        // If audio data available then push
        // it to the chunk array
        mediaRecorder.ondataavailable = function (ev) {
          dataArray.push(ev.data);
        }
 
        // Chunk array to store the audio data
        let dataArray = [];
 
        // Convert the audio data in to blob
        // after stopping the recording
        mediaRecorder.onstop = function (ev) {
 
          // blob of type mp3
          let audioData = new Blob(dataArray,
                    { 'type': 'audio/mp3;' });
           
          // After fill up the chunk
          // array make it empty
          dataArray = [];
 
          // Creating audio url with reference
          // of created blob named 'audioData'
          let audioSrc = window.URL
              .createObjectURL(audioData);
 
          // Pass the audio url to the 2nd video tag
          playAudio.src = audioSrc;
        }
      })
 
      // If any error occurs then handles the error
      .catch(function (err) {
        console.log(err.name, err.message);
      });