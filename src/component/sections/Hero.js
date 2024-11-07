import React from 'react';
import '../styles/Hero.css';
import { ButtonSolidTemplate } from '../uicomponents/ButtonTemplate'
import ImgDevider from '../assets/devider.png';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className='hero relative'>
      
      <div className='hero__content-wrapper relative flex flex-col items-center justify-center gap-[1rem] text-center max-w-[1000px] p-[1rem]	'>
          <h1 className='hero__text-overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[0] font-bold text-transparent rotate-[-20deg]' style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.170)' }}>FITNESS</h1>
          <h1 className='text-[1.8rem] font-semibold text-white z-[10] md:text-[2rem] lg:text-[2.5rem]'>Create Your <span className='text-[var(--red-color)]'>Ultimate</span> Workout <span className='text-[var(--red-color)]'>Routine</span></h1>
          <p className='text-[0.9rem] text-white text-center font-light z-[11] md:text-[1rem] lg:text-[1.1rem]'>Customize your fitness plan from a variety of exercises.<br></br> Build your ideal workout schedule and stay on track toward your fitness goals.</p>
          <ButtonSolidTemplate buttonLabel='Browse Catalog' solidButtonCustomClass='text-white z-[12] hover:bg-transparent hover:border-[var(--red-color)]' onClick={() => navigate('/catalog')} />
      </div>

      <img src={ImgDevider} className='absolute w-full h-[10rem] bottom-0 left-0 object-cover'/>
    </div>
  )
}

export default Hero
