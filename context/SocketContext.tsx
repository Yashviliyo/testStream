// contexts/SocketContext.tsx
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io('http://localhost:3000',{transports: ['websocket']});

type SocketContextType = {
  socket: Socket | null;
  myVideo : any;
  emitJoinEvent : any,
  remoteVideoRef : any
};

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  myVideo : null,
  emitJoinEvent : null,
  remoteVideoRef : null
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const mediaConstraints = {
    audio: true,
    video: { width: 1280, height: 720 },
  }  
  const [isRoomCreator,setIsRoomCreator] = useState(false);
const [localStream,setLocalStream] = useState<any>();
const [roomId, setRoomId] = useState('');

// const [rtcPeerConnection,setRtcPeerConnection] = useState();
let rtcPeerConnection;
const myVideo = useRef<HTMLVideoElement>();
const remoteVideoRef = useRef<HTMLVideoElement>();
// Free public STUN servers provided by Google.
const iceServers = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
  ],
}


// Socket Events






// if(socket)
// {
//   socket.on('roomjoined',(roomId)=>{
//   console.log('RoomJoined',roomId)
//   setLocalStream(mediaConstraints)

// })

//   // SOCKET EVENT CALLBACKS =====================================================
//   // socket.on('start_call', () => {
//   //   console.log('Socket event callback: start_call')  
//   //   if (isRoomCreator) {
//   //     rtcPeerConnection = new RTCPeerConnection(iceServers)
//   //     addLocalTracks(rtcPeerConnection)
//   //     rtcPeerConnection.ontrack = setRemoteStream
//   //     rtcPeerConnection.onicecandidate = sendIceCandidate
//   //     await createOffer(rtcPeerConnection)
//   //   }
//   // })

//   // socket.on('room_created',() => {
//   //   console.log('Socket event callback: room_created')
//   //   setLocalStream(mediaConstraints)
//   //   setIsRoomCreator(true)
//   // })


// }


// Helper Functions
const createPeerConnection = (userId) => {
  const peerConnection = new RTCPeerConnection(iceServers);
  console.log("🚀 ~ file: App.js:47 ~ createPeerConnection ~ peerConnection:", peerConnection)

  // Add local stream to peer connection
  if (localStream) {
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });
  }

  // Set remote video stream when received
  peerConnection.ontrack = (event) => {
    if (!remoteVideoRef.current) return;
    if (event.streams && event.streams[0]) {
      remoteVideoRef.current.srcObject = event.streams[0];
    }
  };
  console.log("🚀 ~ file: SocketContext.tsx:98 ~ createPeerConnection ~ peerConnection:", peerConnection,remoteVideoRef)
  
  // ... Rest of the peer connection setup (negotiation, ICE candidates, etc.)

  // Add this peer connection to a state or global variable for later use
};









const emitJoinEvent = (id : string,username : string) =>{
  socket.emit('join-room', roomId);
  console.log("🚀 ~ file: App.js:26 ~ joinRoom ~ roomId:", roomId)

  // Receive other users' video streams
  socket.on('user-connected', (userId) => {
    createPeerConnection(userId);
    console.log(userId,'new user')
  });

}


  useEffect(() => {
    setSocket(io('http://localhost:3000',{transports: ['websocket']}));
  }, []);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then((currentStream : any)=>{
      setLocalStream(currentStream)
      console.log(currentStream)
      myVideo.current.srcObject = currentStream;
    });
  
    if (socket) {
      // Socket logic goes here
      socket.on('connect', () => {
        console.log('Connected to the socket server!');
      });


      return () => {
        // Clean up event listeners when the component unmounts
        socket.off('connect');
        // Clean up other event listeners as needed
      };
    }
  }, [socket]);

  return <SocketContext.Provider value={{ 
    socket,
    myVideo,
    emitJoinEvent,
    remoteVideoRef
  
  }}>{children}</SocketContext.Provider>;
};


