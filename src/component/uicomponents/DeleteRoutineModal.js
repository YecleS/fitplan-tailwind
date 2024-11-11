import React from 'react';
import { ButtonSolidTemplate, ButtonTransparentTemplate } from './ButtonTemplate';
import { AlertsSuccess, AlertError } from './Alerts';

const DeleteRoutineModal = ({selectedExercise, onClick, fetchRoutine}) => {
    
    const submit = async() => {
        try {
            const response = await fetch('https://fit-plan.lovestoblog.com/db_deleteRoutine.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ routine_id: selectedExercise.routine_id })
            });

            const result = await response.json();
            
            if(result.success){
                AlertsSuccess(result.success);
                fetchRoutine();
                onClick();
            }else {
                console.error(result);
            }
            
        }catch(error) {
            console.error(error)
        }
    }

  return (
    <div>
      <h2>Are you sure you want to delete this exercise ? <span className='text-[1rem] font-[600]'>{selectedExercise.name}</span></h2>
      <h2>Once deleted it will be removed from all of the schedules.</h2>
      <h2>If you just want to change the schedule, just clicked on edit instead of deleting</h2>
      <div className='flex gap-[1rem] items-center justify-center mt-[2rem]'>
        <ButtonSolidTemplate onClick={() => onClick()} buttonLabel='Cancel' solidButtonCustomClass='text-white hover:border-[var(--red-color)] hover:bg-white hover:text-black' />
        <ButtonTransparentTemplate onClick={submit} buttonLabel='Delete' transparentButtonClass='text-black hover:border-transparent hover:bg-[var(--red-color)] hover:text-white'/>
      </div>
    </div>
  )
}

export default DeleteRoutineModal
