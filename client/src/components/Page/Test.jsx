import React from 'react'
import { useParams } from 'react-router-dom'

export default function Test() {
    const param = useParams();
    console.log(param);
    console.log("comic render");
  return (
    <div>Test</div>
  )
}
