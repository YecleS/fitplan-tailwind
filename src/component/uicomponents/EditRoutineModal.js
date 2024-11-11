import React, { useState } from 'react';
import { RegularInputFieldNumberTemplate, CheckFieldsTemplate } from './InputFieldsTemplate';
import { ButtonSolidTemplate } from './ButtonTemplate';
import * as Yup from 'yup';
import { AlertsSuccess, AlertError } from './Alerts';

const EditRoutineModal = ({selectedExercise, onClick, fetchRoutine}) => {
    const [formattedError, setFormattedError] = useState({});
    const [formData, setFormData] = useState({
        routine_id: selectedExercise.routine_id,
        reps: Number(selectedExercise.repetitions) || 0,
        sets: Number(selectedExercise.sets) || 0,
        schedule: selectedExercise.schedule.split(',')
    });

    const scheduleOptions = [
        {label: 'Monday', value:'monday'},
        {label: 'Tuesday', value:'tuesday'},
        {label: 'Wednesday', value:'wednesday'},
        {label: 'Thursday', value:'thursday'},
        {label: 'Friday', value:'friday'},
        {label: 'Saturday', value:'saturday'},
        {label: 'Sunday', value:'sunday'},
    ]

    const clearFields = () => {
        setFormData({
            routine_id: selectedExercise.routine_id,
            reps: Number(selectedExercise.repetitions) || 0,
            sets: Number(selectedExercise.sets) || 0,
            schedule: selectedExercise.schedule.split(',')
        })
    }

    const handleInputFieldChange = (e) => {
        const { name, value } = e.target;

        setFormData ({
            ...formData,
            [name]: value === "" ? null : Number(value)
        })
    }
    
    const handleCheckboxesChanges = (day) => {
        setFormData((prevSchedule) => {
            const updatedSchedule = prevSchedule.schedule.includes(day)
            ? prevSchedule.schedule.filter((prevDay) => prevDay !== day)
            : [...prevSchedule.schedule, day];

            return {...prevSchedule, schedule: updatedSchedule}

        })
    }

    //Validation schema for input fields
    const validationSchema = Yup.object().shape({
        reps: Yup.number()
            .transform((value) => (value === "" ? null : value))
            .required('Reps is required')
            .min(1, 'Reps must be at least 1'),
        sets: Yup.number()
            .transform((value) => (value === "" ? null : value))
            .required('Sets is required')
            .min(1, 'Sets must be at least 1'),
        schedule: Yup.array()
            .min(1, 'At least one schedule day is required')
            .required('Schedule is required')
    });

    const submit = async(e) => {
        e.preventDefault();

        try {
            await validationSchema.validate(formData, {abortEarly: false});

            const response = await fetch('https://fit-plan.lovestoblog.com/db_updateRoutine.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if(result.success){
                AlertsSuccess(result.success);
                setFormattedError({});
                clearFields();
                fetchRoutine();
                onClick();
            }else {
                console.error(result);
            }
            
        }
        catch (validationError) {
            if(validationError && validationError.inner){
              const formatError = {};
      
              validationError.inner.forEach((errors) => {
                formatError[errors.path] = errors.message;
              })
      
              setFormattedError(formatError);
            }else {
              console.error(validationError);
            }
    
          }

    }

  return (
    <div>
      <form>
        <h1 className='text-center mt-[1.5rem] capitalize font-[600] text-[1.125rem]'>{selectedExercise.name}</h1>

        <RegularInputFieldNumberTemplate 
            customInputFieldWrapperClass='mt-[2rem] text-left' 
            fieldLabel='Number Of Reps' 
            fieldIcon='fa-clock' 
            fieldName='reps'
            value={formData.reps}
            onChange={handleInputFieldChange}
            fieldError={formattedError.reps}
        />

        <RegularInputFieldNumberTemplate 
            customInputFieldWrapperClass='mt-[2rem] text-left' 
            fieldLabel='Number Of Sets' 
            fieldIcon='fa-dumbbell' 
            fieldName='sets'
            value={formData.sets}
            onChange={handleInputFieldChange}
            fieldError={formattedError.sets}
        />

        <div className='relative'>
            <p className='text-[0.9rem] font-[500] lg:text-[1rem] text-left mt-[2rem]'>Schedule</p>

            <div className='relative mt-2 flex flex-col items-start justify-center'>
                {
                    scheduleOptions.map((schedule, index) => (
                        <label className='ml-[1rem]' key={index}>
                            <input type='checkbox'
                                className='mr-[0.5rem]'  
                                value={schedule.value} 
                                checked = {formData.schedule.includes(schedule.value)}
                                onChange={() => handleCheckboxesChanges(schedule.value)}
                                
                            />
                            {schedule.label}
                        </label>
                    ))
                }
                
            </div>
            {formattedError.schedule && <p className='regular-input-field__error text-[0.80rem] text-[#F51B31] absolute left-[0] bottom-[-1.5rem]'>{formattedError.schedule}</p>}
        </div>
        

        <ButtonSolidTemplate 
            solidButtonCustomClass='mt-[3rem] w-[100%] text-white hover:bg-transparent hover:border-[var(--red-color)] hover:text-black' 
            buttonLabel='Submit'
            onClick={submit} 
        />
      </form>
    </div>
  )
}

export default EditRoutineModal
