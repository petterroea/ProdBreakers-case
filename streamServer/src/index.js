console.log("Hello, world")
const NodeMediaServer = require('node-media-server');

const io = require('socket.io-client');
 
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    mediaroot: '/srv/vods',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: '/opt/ffmpeg/ffmpeg',
    tasks: [
      {
        app: 'live',
        mp4: true,
        mp4Flags: '[movflags=frag_keyframe+empty_moov]',
      }
    ]
  }
};
//Connect socket

const connection = io('http://server:9000')
 
var nms = new NodeMediaServer(config)
nms.run();


nms.on('prePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  connection.emit('streamStart', {StreamPath})
});

nms.on('donePublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on donePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  connection.emit('streamEnd', {StreamPath})
});