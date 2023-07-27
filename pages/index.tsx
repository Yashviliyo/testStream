import Link from 'next/link'
import Layout from '../components/Layout'
import { useContext, useEffect, useRef, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { SocketContext } from '../context/SocketContext';
// import { SocketProvider } from '../context/SocketContext';
const IndexPage = ({serverRenderedData}) => {
const socket = useSocket()
const context = useContext(SocketContext);
const [sample,setSample] = useState('check');
const [meetingId,setMeetingId] = useState<string>();
const mediaConstraints = {
  audio: true,
  video: { width: 1280, height: 720 },
}

// Helper Functions
const setLocalMediaStreamConnection = () => {

  try {

  } catch (error) {
    console.error('Could not get user media', error)
  }

}


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


  
return(
  <Layout title="Home | Next.js + TypeScript Example">
    <div className='flex w-screen h-screen p-[10%] gap-[5%] justify-center'>

      <h1 className='text-lg my-auto'>Video Conference App</h1>
      {/* Local Feed */}
      <p>Local Video Feed</p>
      <video
      playsInline
      muted
      autoPlay
      ref = {context.myVideo}
      className='flex border-2 w-[30%] h-[40%]'
      />
     {/* Remote feed */}
     {context.remoteVideoRef &&  <p>Remote Stream</p>}
      {context.remoteVideoRef && <video
      playsInline
      // muted
      autoPlay
      ref = {context.remoteVideoRef}

      className='flex border-2 w-[30%] h-[40%]'
      />
}     
      <input className="my-auto py-[1%] px-[1%] border-2" type="text" id="lname" name="lname"
      onChange={(e)=>setMeetingId(e.target.value)}
      />
      <button className='border-2 px-10 py-5 my-auto'
      onClick={()=>context.emitJoinEvent(meetingId,'yash')}
      >Join</button>
    <p>{sample}</p>
    </div>
  </Layout>
)}

export default IndexPage


export async function getServerSideProps() {
  // Perform server-side computations or fetch data here
  const serverRenderedData = 'Data fetched from server';

  return {
    props: {
      serverRenderedData,
    },
  };
}