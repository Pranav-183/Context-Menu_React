import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
   const navigate = useNavigate()
   const defaultContextInfo = {
      show: false,
      pos: {
         top: 'unset',
         bottom: 'unset',
         left: 'unset',
         right: 'unset'
      }
   }
   const [contextInfo, setContextInfo] = useState(defaultContextInfo)
   const { top, bottom, right, left } = contextInfo.pos

   const options = [
      {
         text: 'Home',
         func: () => navigate('/')
      },
      {
         text: <a href="https://www.google.com" target="_blank">Go to Google</a>,
         func: () => {}
      }
   ]

   let totalHeight = `${options.length * 40}px`, totalWidth = '225px'

   const contextFunc = e => {
      e.preventDefault()
      const h = window.innerHeight, w = window.innerWidth, x = e.clientX, y = e.clientY, nowWidth = 225, nowHeight = options.length * 40
      setContextInfo({
         show: true,
         pos: {
            top: h - y < nowHeight ? 'unset' : `${y}px`,
            bottom: h - y < nowHeight ? `${h - y}px` : 'unset',
            left: w - x < nowWidth ? 'unset' : `${x}px`,
            right: w - x < nowWidth ? `${w - x}px` : 'unset'
         }
      })
   }
   return (
      <div className="About" onContextMenu={contextFunc} onClick={() => setContextInfo(defaultContextInfo)}>
         <h2>About Page</h2>
         {contextInfo.show && <ul style={{ height: totalHeight, width: totalWidth, top, bottom, right, left }}>
            {options.map(option => (
               <li key={option.text} onClick={option.func}>{option.text}</li>
            ))}
         </ul>}
      </div>
   )
}

export default About;