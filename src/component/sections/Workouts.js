import React, { useEffect, useState } from 'react';
import WorkoutCards from '../uicomponents/WorkoutCards';
import '../styles/Workouts.css'
import { ButtonSolidTemplate } from '../uicomponents/ButtonTemplate';
import { useNavigate } from 'react-router-dom';

const Workouts = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async() => {
            try {
                const response = await fetch(`${apiUrl}/fitplan_backend/db_getWorkoutsSection.php`, {
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json',
                    },
                });
    
                const result = await response.json();
                if(result.success){
                    setWorkouts(result.success);
                }else {
                    console.error(result);
                }
   
            }catch(error){
                console.error(error);

            }finally {
                setIsLoading(false);
            }
        }

        fetchWorkouts();
    }, []);

  return (
    <div className='py-[1rem] mt-[8rem] mb-[3rem]'>
      <div className='max-w-[1100px] mx-auto px-[1rem] grid grid-cols-[]'>
        <div>
            <h2 className='text-[1.5rem] font-[800] text-center md:text-[1.8rem] lg:text-[2rem]'>Browse Through Our Catalog</h2>
            <p className='text-[1rem] font-[400] text-center block w-[80%] mx-auto'>
                Discover a curated selection of workouts tailored to suit all fitness levels and goals. From strength-building exercises to flexibility routines, our catalog has everything you need to stay motivated and reach your full potential.
            </p>
        </div>
        <div className='workouts__cards-wrapper mt-[2rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[1rem]'>
            {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <div className='card-loading-state rounded' key={index}> 
                        </div>
                    ))
                ):(
                    workouts.map((workouts) => (
                        <WorkoutCards
                            key={workouts.id}
                            id={workouts.id} 
                            img={workouts.image_url}
                            name={workouts.name}
                            category={workouts.category}
                            difficulty={workouts.difficulty}
                            primaryMuscleTarget={workouts.primary_target_muscle}
                        />
                    ))
                )
            }

            <div className='mx-auto mt-[1rem] w-[100%] col-span-1 sm:col-span-2 md:col-span-4 flex items-center justify-center'>
                <ButtonSolidTemplate
                    solidButtonCustomClass='text-[white] hover:bg-white hover:text-black hover:border-[1px] hover:border-solid  hover:border-[var(--red-color)]' 
                    buttonLabel='Browse Now'
                    onClick={() => navigate('/catalog')}
                />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Workouts
