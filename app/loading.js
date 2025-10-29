"use client"

import Lottie from "lottie-react"
import loadingAnimation from '@/public/animations/sandyLoading.json'

export default function Loading() {
  return (
    <div id="loading" style={{height: '100dvh', display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
      <Lottie animationData={loadingAnimation} loop={true} style={{height: '30dvh'}}/>
    </div>
  )
}