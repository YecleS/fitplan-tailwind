import React, { useEffect, useState } from 'react';
import '../styles/Catalog.css';
import WorkoutCards from '../uicomponents/WorkoutCards';
import PageHeader from '../uicomponents/PageHeader';
import Footer from '../sections/Footer';
import CatalogFilter from '../uicomponents/CatalogFilter';

const Catalog = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loaded, isLoaded] = useState(false);
  const [search, setSearch] = useState('');
  const [isFilterActive, isSetFilterActive] = useState(false);
  const [filterForm, setFilterForm] = useState({
    category:'',
    difficulty:'',
    target_muscle:''
  });

  const clearFilters = () => {
    setFilterForm({
      category:'',
      difficulty:'',
      target_muscle:''
    })
  }

  useEffect(() => {
    const fetchWorkouts = async() => {
      try { 
        const response = await fetch('https://fit-plan.lovestoblog.com/db_getWorkoutCatalog.php', {
          method: 'GET',
          headers: {
              'Content-Type':'application/json',
          },
        });

        const result = await response.json();

        if(result.success){
          setWorkouts(result.success);
        }else {
          console.error(result)
        }
        
      }
      catch (error) {
        console.error(error);
      }
      finally {
        isLoaded(true);
      }
    }

    fetchWorkouts();

  }, [])

  return (
    <div className=''>
      <PageHeader pageTitle='Workout Catalog' pageDescription='Choose The Most Suitable Exercise For You' />

      <div className='catalog__body max-w-[1100px] mt-[2rem] mb-[2rem] mx-auto px-[1rem] min-h-[100vh]'>

        <div className='flex align-center justify-start gap-[0.5rem]'>
          <input type='text' onChange={(e) => setSearch(e.target.value)} className='w-[300px] border-[1px] border-solid border-black py-[0.4rem] px-[1rem] rounded text-[0.95rem] outline-none ' placeholder='Search Workout'/>
          <div className='catalog__filter-icon-wrapper relative bg-black rounded w-[45px] border-[1px] border-[transparent] cursor-pointer flex items-center justify-center transition-all duration-300 ease' onMouseEnter={() => isSetFilterActive(true)} onMouseLeave={() => isSetFilterActive(false)}>
            <i className="fa-solid fa-filter text-[1.3rem] text-[white] transition-all duration-300 ease"></i>

            { isFilterActive && 
              <div className='absolute z-[100] top-[-5px] left-[-5px]'>
                <CatalogFilter filterForm={filterForm} setFilterForm={setFilterForm} clearFilters={clearFilters}/>
              </div> 
            }
            
          </div>
        </div>
        
        <div className='mt-[1rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1rem]'>
          {
            loaded ?
            (
              workouts.filter(exercises => 
                ( exercises.name.toLowerCase().includes(search.toLowerCase())
                  && exercises.category.toLowerCase().includes(filterForm.category)
                  && exercises.difficulty.toLowerCase().includes(filterForm.difficulty)
                  && exercises.primary_target_muscle.toLowerCase().includes(filterForm.target_muscle)
                )
              ).map(exercises => (
                <WorkoutCards 
                  key={exercises.id}
                  id={exercises.id}
                  img={exercises.image_url}
                  name={exercises.name}
                  category={exercises.category}
                  difficulty={exercises.difficulty}
                  primaryMuscleTarget={exercises.primary_target_muscle}
                />
              ))
            ):
            (
              Array.from({ length: 12 }).map((_, index) => (
                <div className='card-loading-state rounded' key={index}> 
                </div>
              ))
            )
          }   
        </div>
          
      </div>
      <Footer />
    </div>
  )
}

export default Catalog
