import React from 'react'
import AboutImg from '../assets/about-img.jpg';
import { ButtonSolidTemplate } from '../uicomponents/ButtonTemplate';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <section className='py-[1rem] mt-[5rem]'>
      <div className='about__content-wrapper max-w-[1100px] mx-auto px-[1rem] grid grid-cols-1 gap-[1.5rem] md:grid-cols-2 md:gap-[3rem]'>  

        <div className='relative'>
        <h1 className='absolute text-[4rem] top-1/2 left-[-7rem] transform -translate-y-1/2 z-[1] font-bold text-transparent rotate-[-90deg]' style={{ WebkitTextStroke: '1px red' }}>FITNESS</h1>
            <img src={AboutImg} className='rounded w-[100%] h-[100%] object-cover'/>
        </div>

        <div className='flex flex-col py-[1rem]'>
            <h2 className='text-[1.5rem] font-[800] md:text-[1.8rem] lg:text-[2rem] text-[var(--red-color)]'>Empowering Your Fitness Journey</h2>
            <p className='text-[1rem] mt-[1rem]'>
                At FitPlan, our mission is to make fitness accessible and enjoyable for everyone. Our app offers a diverse catalog of exercises, customizable routines, With embedded video tutorials and organized routines, we aim to provide a seamless fitness experience that empowers users to take control of their health and wellness. to help you build a workout that fits your unique goals.
            </p>

            <div className='mt-[1rem]'>
                <ButtonSolidTemplate
                    solidButtonCustomClass='text-[white] hover:bg-white hover:text-black hover:border-[1px] hover:border-solid  hover:border-[var(--red-color)]' 
                    buttonLabel='Browse Now'
                    onClick={() => navigate('/catalog')}
                />
            </div>
            
        </div>
      </div>
    </section>
  )
}

export default About
