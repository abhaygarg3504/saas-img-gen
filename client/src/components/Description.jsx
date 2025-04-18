import React from 'react'
import { assets } from '../assets/assets'
import {  motion } from "motion/react"
const Description = () => {
  return (
    <motion.div
    initial={{opacity:0.1 , y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once: true}}
    className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI images</h1>
    <p className='text-gray-500 mb-8 '>
        Turn your imagination into visuals
    </p>

    <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img src={assets.sample_img_1} className='w-80 xl:w-96 rounded-lg' alt="" />
        <div>
            <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI powered Text to Image Generator</h2>
            <p className='text-gray-600 mb-4'>Generate stunning AI-powered images from text instantly. Simply describe your 
                vision, and our advanced AI transforms words into beautiful visuals. Perfect for 
                artists, designers, and creators. Fast, easy, and limitless creativity at your 
                fingertips. Try it now!</p>
        </div>
    </div>

    </motion.div>
  )
}

export default Description
