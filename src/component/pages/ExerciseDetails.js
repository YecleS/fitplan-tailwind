import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonSolidTemplate, ButtonTransparentTemplate } from '../uicomponents/ButtonTemplate';
import PageHeader from '../uicomponents/PageHeader';
import LoadingSpinner from '../uicomponents/LoadingSpinner';
import Footer from '../sections/Footer';
import AddToRoutineModal from '../uicomponents/AddToRoutineModal';
import { UserContext } from '../utils/UtilContext';

const ExerciseDetails = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const spinnerDialog = useRef();
    const submitModal = useRef();
    const [selectedExercise, setSelectedExercise] = useState({})

    useEffect(() => {
        const fetchWorkouts = async() => {
            const apiUrl = process.env.REACT_APP_API_URL;
            spinnerDialog.current.showModal();
            
            try {
                const response = await fetch(`${apiUrl}/fitplan_backend/db_getWorkoutDetails.php`, {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                    },

                    body: JSON.stringify({ workout_id: id })
                });
    
                const result = await response.json();
                if(result.success){
                    setSelectedExercise(result.success);
                }else if(result.warning) {
                    setSelectedExercise({});
                }
   
            }catch(error){
                console.error(error);
            }
            finally {
                spinnerDialog.current.close();     
            }
        }

        fetchWorkouts();
    }, []);

    const toggleAddToRoutineModal = () => {
        if(submitModal.current.open){
            submitModal.current.close();
        }else {
            submitModal.current.showModal();
        }
    }

    return (
        <div>
            <PageHeader pageTitle='Know Your Exercise' pageDescription='Detailed Information On Your Chosen Exercise' />
            <div className='max-w-[1100px] min-h-[90vh] mt-[5rem] mx-auto px-[1rem] pb-[5rem]'>
                {
                    Object.keys(selectedExercise).length > 0 ?
                    (
                        <div className='grid grid-cols-1 max-w-[1100px] mt-[1rem] gap-[2rem] md:grid-cols-2'>
                            <div>
                                <iframe 
                                    width="100%" 
                                    height="350px" 
                                    src={`${selectedExercise.video_url}`} 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    allowFullScreen>
                                </iframe>
                            </div>
                            <div>
                                <h2 className='font-[700] capitalize text-[1.5rem]'>{selectedExercise.name}</h2>
                                <p className='text-[1rem] font-[400] mt-[1rem]'>{selectedExercise.description}</p>
                                <p className='font-[400] text-[1rem] mt-[1rem]'><span className='font-[600] text-[1rem]'>Category: </span> {selectedExercise.category}</p>
                                <p className='font-[400] text-[1rem] mt-[1rem]'><span className='font-[600] text-[1rem]'>Difficulty: </span> {selectedExercise.difficulty}</p>
                                <p className='font-[400] text-[1rem] mt-[1rem]'><span className='font-[600] text-[1rem]'>Variation Of: </span> {selectedExercise.variation_of}</p>
                                <p className='font-[400] text-[1rem] mt-[1rem]'><span className='font-[600] text-[1rem]'>Primary Target Muscle: </span> {selectedExercise.primary_target_muscle}</p>
                                <p className='font-[400] text-[1rem] mt-[1rem]'><span className='font-[600] text-[1rem]'>Other Target Muscle Groups: </span> {selectedExercise.other_muscle_groups}</p>

                                <div className='flex items-center justify-start gap-[1rem] mt-[1rem]'>
                                    <ButtonTransparentTemplate 
                                        transparentButtonClass='hover:bg-[var(--red-color)] hover:text-white' 
                                        buttonLabel='View More'
                                        onClick={() => navigate('/catalog')} 
                                    />

                                    {
                                        user.user_id ? (
                                        <ButtonSolidTemplate
                                            solidButtonCustomClass='text-white hover:bg-white hover:border-[var(--red-color)] hover:text-black' 
                                            buttonLabel='Add To Routine'
                                            onClick={toggleAddToRoutineModal} 
                                        />
                                        ): ''
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    ):
                    (
                        <ErrorMessage />
                    )
                }
            </div>

            <dialog className='bg-black p-[1rem] rounded-[5px]' ref={spinnerDialog}>
                <LoadingSpinner />
            </dialog>

            <dialog className='p-[2rem] rounded-[5px]' ref={submitModal}>
                <h1 className='text-center text-[1.2rem] font-[700]'>Add To Routine</h1>
                <AddToRoutineModal selectedExercise={selectedExercise} onClick={toggleAddToRoutineModal}/>
            </dialog>  

            <Footer />
        </div>
    )
  
}

export default ExerciseDetails


export const ErrorMessage = () => {
    const navigate = useNavigate();

    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200">404</h1>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

                <p className="mt-4 text-gray-500">Exercises Cannot Found.</p>

                <ButtonSolidTemplate buttonLabel='Go Back To Catalog' solidButtonCustomClass='mt-[2rem] text-white' onClick={() => navigate('/')} />
            </div>
        </div>
    )
}


