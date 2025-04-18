import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import {motion} from "motion/react"
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const GenerateBtn = () => {
  
  const {user, setshowLogin} = useContext(AppContext)
  const navigate = useNavigate()
  const onClickHandler = async()=>{
      if(user){
        navigate('/result')
      } else{
        setshowLogin(true)
      }
  }
  return (
    <motion.div
    initial={{opacity:0.1 , y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once: true}}
     className='pb-16 text-center items-center justify-center flex flex-col'>
     <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 
                 py-6 mdd:py-16 '>
        See the magic. Try Now</h1>
      <button onClick={onClickHandler} className='sm:text-lg text-white bg-black rounded-full w-auto mt-8 px-12 py-2.5
            flex cursor-pointer items-center gap-2'>
                Generate Images
                <img className='h-6' src={assets.star_group} alt="" />
            </button>
    </motion.div>
  )
}

export default GenerateBtn
