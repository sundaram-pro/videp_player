'use client'
import VideoPlayer from '@/components/VideoPlayer'
import React, {useState} from 'react'

const video_player = () => {
  const [quality, setQuality] = useState(480)
  const [time, setTime] = useState(0)
  return (
    <main>
      
      <div>
        <VideoPlayer 
        title={"testTitle1"}
        urlInput={"https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_10mb.mp4"}
        // urlInput={"https://www.youtube.com/watch?v=pTIfeeqd6VI&t=115s"}
        heightInput={500}
        widthInput={750}
        subtitlesInput={"dummy text"}
        setQuality={480}
        videoTimeInput={0}
        setVideoTime={setTime}
        /> 
      </div>

    </main>
  )
}

export default video_player