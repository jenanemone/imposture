const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const ejs = require('ejs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const flash = require("express-flash");
const logger = require('morgan');
const connectDB = require('./config/database');
const multer = require('multer');
const fs = require('fs');

const mainRoutes = require('./routes/main');
const boardRoutes = require("./routes/dashboard");
//const recordRoutes = require("./routes/record");
const speechRoutes = require("./routes/speech");

// env config
require('dotenv').config( { path: './config/.env' } );

// passport config
require ('./config/passport')(passport);

// connect to database
connectDB();

// Use EJS
app.set('view engine', 'ejs');

// Static folder
app.use( express.static( path.join( __dirname, "public" ) ) );
app.use(express.static(path.join( __dirname,'uploads') ) );
console.log(__dirname);
//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

// Sessions
let store = MongoStore.create({
    client: mongoose.connection.getClient()
})
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: store
} ) );

app.use(flash());

// Passport middleware
app.use(passport.initialize() );
app.use(passport.session() );

// Set global variable
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

//Use forms for put / delete
app.use(methodOverride("_method"));

// Routes
app.use("/", mainRoutes);
app.use("/dashboard", boardRoutes);
//app.use("/record", recordRoutes);
app.use("/speech", speechRoutes);

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const fileNameArr = file.originalname.split('.');
      cb(null, `${Date.now()}.${fileNameArr[fileNameArr.length - 1]}`);
    },
  });
  const upload = multer({ storage });

app.post('/record', upload.single('audio'), (req, res) => res.json({ success: true }));

app.get('/recordings', (req, res) => {
  let files = fs.readdirSync('uploads');
  files = files.filter((file) => {
    // check that the files are audio files
    const fileNameArr = file.split('.');
    return fileNameArr[fileNameArr.length - 1] === 'ogg';
  }).map((file) => `/${file}`);
  const result = res.json({ success: true, files });
  console.log(files);
  return result;
});

// use public spech
const pubSpeech = require('./routes/publicSpeech');
app.use('/publicSpeech', pubSpeech);

// //STT
// const { credentials, Metadata } = require("@grpc/grpc-js");
// const { IdentityAPIClient } = require("@speechly/api/speechly/identity/v2/identity_api_grpc_pb");
// const identityClient = new IdentityAPIClient("api.speechly.com", credentials.createSsl());
// const { SLUClient } = require("@speechly/api/speechly/slu/v1/slu_grpc_pb");
// const sluClient = new SLUClient("api.speechly.com", credentials.createSsl());
// const { LoginRequest, ApplicationScope, ProjectScope } = require("@speechly/api/speechly/identity/v2/identity_api_pb");
// const { SLURequest, SLUConfig, SLUEvent } = require("@speechly/api/speechly/slu/v1/slu_pb");
// const appId = "39285e2b-b8dc-4de7-b989-81e5dff11685";

// async function login(deviceId, appId) {
//   return new Promise((resolve, reject) => {
//     const req = new LoginRequest();
//     req.setDeviceId(deviceId);
//     if (appId !== undefined) {
//       const app = new ApplicationScope();
//       app.setAppId(appId);
//       req.setApplication(app);
//     }
//     // } else {
//     //   const project = new ProjectScope();
//     //   project.setProjectId(projectId);
//     //   req.setProject(project);
//     // }
//     identityClient.login(req, (err, res) => {
//       if (err) {
//         reject(err);
//       }
//       resolve({
//         token: res.getToken(),
//         expires: new Date(res.getExpiresAt())
//       });
//     });
//   });
// }

// async function stream_speech(data, appId, token) {
//   return new Promise((resolve, reject) => {
//     // Set up metadata with authorization token, and start the stream
//     const md = new Metadata();
//     md.add("Authorization", `Bearer ${token}`);
//     const call = sluClient.stream(md);

//     // expect to get transcript, entities and intent
//     const transcript = [];
//     const entities = [];
//     let intent = "";

//     // set up event handlers for incoming data
//     call.on("data", d => {
//       if (d.hasStarted()) {
//         console.log("Started audio context", d.getAudioContext());
//       } else if (d.hasFinished()) {
//         console.log("Stopped audio context", d.getAudioContext());
//       } else if (d.hasTranscript()) {
//         transcript.push(d.getTranscript().getWord());
//       } else if (d.hasEntity()) {
//         entities.push(d.getEntity().getEntity());
//       } else if (d.hasIntent()) {
//         intent = d.getIntent().getIntent();
//       }
//     });
//     // on server error, reject promise
//     call.on("error", err => {
//       reject(err);
//     });
//     // when API ends, every result is ready
//     call.on("end", () => {
//       resolve({
//         intent,
//         entities: entities.join(", "),
//         transcript: transcript.join(" ")
//       });
//     });

//     // send audio configuration
//     const config = new SLUConfig();
//     config.setEncoding(SLUConfig.Encoding.LINEAR16);
//     config.setChannels(1);
//     config.setSampleRateHertz(16000);
//     const configReq = new SLURequest();
//     configReq.setConfig(config);
//     call.write(configReq);

//     // start new audio context
//     const startContextReq = new SLURequest();
//     const startEvent = new SLUEvent();
//     startEvent.setEvent(SLUEvent.Event.START);
//     startEvent.setAppId(appId);
//     startContextReq.setEvent(startEvent);
//     call.write(startContextReq);

//     // for every chunk in data, send it to API
//     data.on("data", chunk => {
//       const req = new SLURequest();
//       req.setAudio(chunk);
//       call.write(req);
//     });

//     // send stop context and end call (half-close stream)
//     data.on("end", () => {
//       const stopContextReq = new SLURequest();
//       const stopEvent = new SLUEvent();
//       stopEvent.setEvent(SLUEvent.Event.STOP);
//       stopContextReq.setEvent(stopEvent);
//       call.write(stopContextReq);
//       call.end();
//     });
//   });
// }

// (async () => {
//   try {
//     const projectId = "your_project_id";
//     const deviceId = "generated_UUID_for_device";
//     const appId = "your_app_id";
//     const loginRes = await login(deviceId, undefined, projectId);
//     const data = readAudioSource();
//     const res = await stream_speech(data, appId, loginRes.token);

//     console.log("Intent: ", res.intent);
//     console.log("Entities: ", res.entities);
//     console.log("Transcript: ", res.transcript);
//   } catch (err) {
//     console.error(err);
//   }
// })();

// const wav = require("wav");


// function readWAV(file) {
//   const fstream = fs.createReadStream(file);
//   const reader = new wav.Reader();
//   fstream.pipe(reader);
//   return reader;
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`) );