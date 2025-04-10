"use client"
import React, { useState } from 'react'
import Sidebar from './_components/Sidebar'
import Header from './_components/Header'
import { Coursecount } from '../_context/Coursecount'

function Dashboardlayout({children}) {
  const [totalcourses,settotalcourses]=useState(0);
  return (
    <Coursecount.Provider value={{totalcourses,settotalcourses}}>
    <div>
      <div className='md:w-64 hidden md:block fixed'>
        <Sidebar/>
      </div>
      <div className='md:ml-64'>
        <Header/>
      
      
      <div className='p-10'>{children}</div>
      </div>
  </div>
  </Coursecount.Provider>
  )
}

export default Dashboardlayout