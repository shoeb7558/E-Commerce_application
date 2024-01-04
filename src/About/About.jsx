import React from 'react'
import myimage from './linkedin.jpg'
import './AboutModule.css'

function About() {
  return (
    <div>
      <h1 className='h1'>ABOUT ME</h1>
      <div className='innerdiv'>
      <img className='aboutimg' src={myimage}></img>
      <p className='para1'>I'm Shoeb Shaikh, I am born and raised in India, 
        I have graduated with a digree in computer science and enineering,
         From my early school days, I developed a profound passion for coding. HTML, 
         though not a traditional programming language, was my first foray into the world
          of programming. It ignited my enthusiasm for technology and laid the foundation
           for my coding journey.</p>
       </div>
    </div>
  )
}

export default About
