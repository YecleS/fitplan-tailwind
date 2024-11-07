import React from 'react';
import '../styles/WorkoutCards.css';
import { NavLink } from 'react-router-dom';

const WorkoutCards = ({id, img, name, category, difficulty, primaryMuscleTarget}) => {
  return (
    <NavLink to={`/exercise-details/${id}/${name}`}>
      <div className='workout-cards p-[0.5rem] rounded cursor-pointer'>
        <div className='overflow-hidden'>
          <img src={img} className='workout-cards__img h-[180px] w-[100%] object-cover rounded ' loading='lazy'/>
        </div>
          <div className='px-[0.5rem]'>
              <h3 className='text-[1rem] font-[600] mt-[0.5rem] capitalize'>{name}</h3>
              <p className='text-[0.9rem] font-[400] mt-[1rem]'><span className='text-[0.95rem] font-[500]'>Category:</span> {category}</p>
              <p className='text-[0.9rem] font-[400] mt-[0.5rem]'><span className='text-[0.95rem] font-[500]'>Difficulty:</span> {difficulty}</p>
              <p className='text-[0.95rem] font-[500] mt-[0.5rem]'>Target Muscle:</p>
              <p className='text-[0.9rem] font-[400]'>{primaryMuscleTarget}</p>
          </div>
      </div>
    </NavLink>
  )
}

export default WorkoutCards
