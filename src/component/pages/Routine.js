import React, { useEffect, useState, useContext, useRef } from 'react';
import PageHeader from '../uicomponents/PageHeader';
import Footer from '../sections/Footer';
import { UserContext } from '../utils/UtilContext';
import LoadingSpinner from '../uicomponents/LoadingSpinner';
import { ButtonSolidTemplate } from '../uicomponents/ButtonTemplate';
import { useNavigate } from 'react-router-dom';
import '../styles/Routine.css';
import { NavLink } from 'react-router-dom';
import EditRoutineModal from '../uicomponents/EditRoutineModal';
import DeleteRoutineModal from '../uicomponents/DeleteRoutineModal';

const Routine = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { user } = useContext(UserContext);
    const [routines, setRoutines] = useState([]);
    const [userData, setUserData] = useState({});
    const spinnerDialog = useRef();
    const [isRoutineEmpty, setIsRoutineEmpty] = useState(true);
    
    useEffect(() => {
        if(user){
            setUserData({
                user_id: user.user_id
            });
        }
    }, [user]);

    const fetchRoutine = async () => {
        spinnerDialog.current.showModal();
        
        try {
            const response = await fetch(`${apiUrl}/fitplan_backend/db_getRoutines.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();
            if(result.warning){
                console.error(result.warning);
                setIsRoutineEmpty(true);
            }else if(result.success) {
                setRoutines(result.success);
                setIsRoutineEmpty(false);
            }
            
        } catch (error) {
            console.error(error);
        }
        finally {
            spinnerDialog.current.close();
        }
    };

    useEffect(() => {

        if(userData.user_id){
            fetchRoutine();
        }   
    }, [userData]);

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const filterWorkoutByDay = (day) => {
        return routines.filter(exercise => 
            exercise.schedule.toLowerCase().includes(day.toLowerCase().trim())
        );
    }

  return (
    <div>
        <PageHeader pageTitle='My Routines' pageDescription='Build Your Routine Now !' />
        <div className='min-h-[100vh] max-w-[1100px] p-[1rem] mx-auto my-[1.5rem]'>
            {
                user.user_id ? (
                    isRoutineEmpty ? 
                        (
                            <ErrorMessage />
                        ):(
                            <div className='routine__body-wrapper overflow-auto'>
                                { days.map((days, index) => (
                                    <ScheduleContainerTemplate key={index} day={days}>
                                        {filterWorkoutByDay(days).map(exercise => (
                                            <ScheduleDivTemplate key={exercise.routine_id} exercise={exercise} fetchRoutine={fetchRoutine} />
                                        ))}
                                    </ScheduleContainerTemplate>
                                ))}
                            </div>
                        )

                    
                ):(
                     <AuthMessage />
                )
            }
            
        </div>
        <Footer />

        <dialog className='bg-black p-[1rem] rounded-[5px]' ref={spinnerDialog}>
            <LoadingSpinner />
        </dialog>
    </div>
  )
}

export default Routine



export const ScheduleContainerTemplate = ({day, children}) => {
    return (
        <div className='monday flex flex-col items-center justify-start'>
            <div className='bg-[#ffc3c3] w-[100%] text-center py-[1.5rem] px-[0.5rem] rounded'>
                <h1 className='text-[1.1rem] font-[700] uppercase'>{day}</h1>
            </div>

            <div className='min-w-[100%]'>
                {children}
            </div>
        </div>
    )
}



export const ScheduleDivTemplate = ({exercise, fetchRoutine}) => {
    const [isOptionsVisible, isSetOptionsVisible] = useState(false);
    const editModalRef = useRef();
    const deleteModalRef = useRef();

    const toggleEditModal = () => {
        if(editModalRef.current.open || deleteModalRef.current.open){
            editModalRef.current.close(); 
        }else {
            editModalRef.current.showModal();
        }
    }

    const toggleDeleteModal = () => {
        if(deleteModalRef.current.open){
            deleteModalRef.current.close(); 
        }else {
            deleteModalRef.current.showModal();
        }
    }

    return (
        <div className='relative h-[150px] border-solid border-[1px] border-black py-[1rem] px-[0.5rem] my-[1rem] text-center rounded hover:bg-[#ffd5da] hover:border-[var(--red-color)] transition-all duration-300ms ease cursor-pointer' key={exercise.id}>
            <h1 className='text-[0.95rem] font-[600] text-black'>{exercise.name}</h1>
            <p className='text-[0.9rem] font-[500] mt-[1rem] text-black'>Reps: <span>{exercise.repetitions}</span></p>
            <p className='text-[0.9rem] font-[500] text-black' >Sets: <span>{exercise.sets}</span></p>

            <div onMouseEnter={() => isSetOptionsVisible(true)} onMouseLeave={() => isSetOptionsVisible(false)}>
                <i className="absolute bottom-[10px] right-[10px] text-[var(--red-color)] text-[1.2rem] fa-solid fa-circle-info"></i>
                { isOptionsVisible &&
                    <div className='schedule-div-template__card-options rounded'>

                        <NavLink to={`/exercise-details/${exercise.id}/${exercise.name}`}>
                            <li className='list-none flex items-center justify-start gap-[0.3rem] hover:bg-[#ffc3c3] py-[0.5rem] px-[0.5rem] rounded w-[130px]'>
                                <i className="fa-solid fa-glasses text-[1.1rem]"></i>
                                <p className='text-[0.95rem] font-[600]'>View</p>
                            </li>
                        </NavLink>

                        <li className='list-none flex items-center justify-start gap-[0.3rem] hover:bg-[#ffc3c3] py-[0.5rem] px-[0.5rem] rounded w-[130px]' onClick={toggleEditModal}>
                            <i className="fa-solid fa-pen text-[1.1rem]"></i>
                            <p className='text-[0.95rem] font-[600]'>Edit</p>
                        </li>

                        <li className='relative list-none flex items-center justify-start gap-[0.3rem] border-top-[1px] hover:bg-[#ffc3c3] py-[0.5rem] px-[0.5rem] rounded w-[130px] mt-[1rem]' onClick={toggleDeleteModal}>
                            <i className="fa-solid fa-trash text-[1.1rem]"></i>
                            <p className='text-[0.95rem] font-[600]'>Delete</p>
                        </li>
                        
                        
                    </div>
                }
            </div>
        
        <dialog className='p-[2rem] rounded-[5px]' ref={editModalRef}>
            <EditRoutineModal selectedExercise={exercise} onClick={toggleEditModal} fetchRoutine={fetchRoutine} />
        </dialog>

        <dialog className='p-[2rem] rounded-[5px] border-[1px] border-solid border-[var(--red-color)]' ref={deleteModalRef}>
                <DeleteRoutineModal selectedExercise={exercise} onClick={toggleDeleteModal} fetchRoutine={fetchRoutine}/>
        </dialog>
        </div>
    )
}




export const ErrorMessage = () => {
    const navigate = useNavigate();

    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200">404</h1>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>
                <p className="mt-4 text-gray-500">Seems like you haven't added any workouts yet..</p>
                <p className="mt-4 text-gray-500">Go to catalog and add now !</p>
                <ButtonSolidTemplate buttonLabel='Catalog' solidButtonCustomClass='mt-[2rem] text-white' onClick={() => navigate('/catalog')} />
            </div>
        </div>
    )
}

export const AuthMessage = () => {
    const navigate = useNavigate();

    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200">404</h1>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>
                <p className="mt-4 text-gray-500">Seems like you haven't logged in yet..</p>
                <ButtonSolidTemplate buttonLabel='Login' solidButtonCustomClass='mt-[2rem] text-white' onClick={() => navigate('/login')} />
            </div>
        </div>
    )
}