import React from 'react';
import Logo from '../assets/logo.png';

const Footer = () => {
  return (
    <div className='bg-black p-[1rem]'>
      <div className='max-w-[1100px] mx-auto flex flex-col items-center justify-center'>

        <div className='flex items-center justify-center mt-[2rem]'>
            <img src={Logo} className='w-[45px] h-[45px]'/>
            <p className='text-[white] text-[1.3rem] font-[600]'>Fit<span className='text-[var(--red-color)] text-[1.3rem] font-[600]'>Plan</span></p>
        </div> 
        <p className='text-white text-[1.1rem] mt-[1.5rem]'>&copy; 2024 FitPlan. All Rights Reserved. </p>
        
        </div>
    </div>
  )
}

export default Footer
