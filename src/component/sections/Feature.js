import React from 'react';
import '../styles/Feature.css'

const Feature = () => {
  return (
    <section className='feature py-[1rem] mt-[8rem]'>
      <div className='feature__content-wrapper max-w-[1100px] mx-auto px-[1rem]'>
        <div className='feature__header'>
            <h2 className='text-[1.5rem] font-[800] text-center md:text-[1.8rem] lg:text-[2rem]'>PUSH THROUGH YOUR LIMITS</h2>
            <p className='text-[1rem] font-[400] text-center block w-[80%] mx-auto'>
                Take your fitness journey to the next level with our expertly designed workouts and personalized plans.
                Whether you're a beginner or a seasoned athlete.
            </p>
        </div>
        <div className='feature__body gap-[1rem] mt-[2rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>

            <FeatureCard
                icon='fa-clipboard'
                title='Personalized Routine'
                description="Create a workout routine just for you. Set your goals, and we’ll help you achieve them with personalized plans."
            />
            
            <FeatureCard
                icon='fa-calendar-days' 
                title='Organized Routines'
                description="Keep your workouts on track with structured routines that make planning and progression easy."
            />

            <FeatureCard
                icon='fa-dumbbell'  
                title='Varied Exercises'
                description="Explore a diverse catalog of exercises for every fitness level and goal. Find what works best for you."
            />

            <FeatureCard
                icon='fa-thumbs-up'
                title='Beginner Friendly'
                description="Start your fitness journey with confidence. Follow easy-to-understand workouts with video guides to help you succeed."
            />  

        </div>
      </div>
    </section>
  )
}

export default Feature


export const FeatureCard = ({icon, title, description}) => {
    return (
        <div className='feature__card-wrapper p-[1rem] flex flex-col items-center'>
            <div className='feature__icon-wrapper flex items-center justify-center h-[60px] w-[60px] bg-[#1a1a1a] rounded rotate-45'>
                <i className={`fa-solid ${icon} text-[#F51B31] rotate-[-45deg] text-[1.5rem] `}></i>
            </div>

            <h3 className='mt-[1.5rem] text-center text-[1.1rem] font-[700]'>{title}</h3>
            <p className='text-center text-[0.9rem] mt-[0.5rem]'>{description}</p>
        </div>
    );
};
