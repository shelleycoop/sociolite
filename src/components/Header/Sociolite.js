import MySvg from '../../../public/static/sociolite.svg'
import styles  from "./Sociolite.module.scss"

import React from 'react'

const Sociolite = () => {
  return (
    <div className={`styles.centerImage`}>
      
    <MySvg
    width= {800} height={600} 
    />

  </div>
  )
}

export default Sociolite