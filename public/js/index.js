const recorder = document.getElementById('recorder');
const player = document.getElementById('player');
const micRecorder = document.getElementById('micRecorder');
const downloadLink = document.getElementById('download');
const stopButton = document.getElementById('stop');

recorder.addEventListener('change', function (e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
      // Do something with the audio file.
  player.src = url;
});

// const handleSuccess = function (stream) {
//   if (window.URL) {
//     player.srcObject = stream;
//   } else {
//     player.src = stream;
//   }
// };
const handleSuccess = function(stream) {
  const context = new AudioContext();
  const source = context.createMediaStreamSource(stream);
  const processor = context.createScriptProcessor(1024, 1, 1);

  source.connect(processor);
  processor.connect(context.destination);

  processor.onaudioprocess = function(e) {
    // Do something with the data, e.g. convert it to WAV
    console.log(e.inputBuffer);
  };
};

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(handleSuccess);
navigator.mediaDevices
  .getUserMedia({audio: true, video: false})
  .then(handleSuccess);