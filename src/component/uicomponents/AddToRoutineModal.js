import React, { useState, useContext, useEffect } from 'react';
import { RegularInputFieldNumberTemplate, CheckFieldsTemplate } from './InputFieldsTemplate';
import { ButtonSolidTemplate } from './ButtonTemplate';
import * as Yup from 'yup';
import { UserContext } from '../utils/UtilContext';
import { AlertsSuccess, AlertError } from './Alerts';

const AddToRoutineModal = ({selectedExercise, onClick}) => {
    const { user } = useContext(UserContext);
    const [formattedError, setFormattedError] = useState({});
    const [formData, setFormData] = useState({
      reps: 0,
      sets: 0,
      schedule: []
    })

    useEffect(() => {
      setFormData((prevData) => ({
        ...prevData,
        user_id: user.user_id,
        exerciseName: selectedExercise.name,
        exerciseId: selectedExercise.id,
      }));
  }, [user.user_id, selectedExercise]);

    const clearFields = () => {
      setFormData({
        reps: 0,
        sets: 0,
        schedule: []
      })
    }

    const scheduleOptions = [
        {label: 'Monday', value:'monday'},
        {label: 'Tuesday', value:'tuesday'},
        {label: 'Wednesday', value:'wednesday'},
        {label: 'Thursday', value:'thursday'},
        {label: 'Friday', value:'friday'},
        {label: 'Saturday', value:'saturday'},
        {label: 'Sunday', value:'sunday'},
    ]

    const handleFieldChange = (e) => {
      const {name, value} = e.target

      setFormData({
        ...formData,
        // user_id: user,user_id,
        // exerciseName: selectedExercise.name,
        [name]: parseInt(value, 10)
      })
    }

    //Validation schema for input fields
    const validationSchema = Yup.object().shape({
      reps: Yup.number().min(1, 'Reps is required'),
      sets: Yup.number().min(1, 'Sets is required'),
      schedule: Yup.array().min(1, 'Schedule is required')
    });

    const submit = async(e) => {
      e.preventDefault();

      try {
        await validationSchema.validate(formData, {abortEarly: false});

        const response = await fetch('https://fit-plan.lovestoblog.com/db_insertRoutine.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body:JSON.stringify(formData),
        })

        const result = await response.json();

        if(result.success){
          clearFields();
          setFormattedError({});
          AlertsSuccess(result.success);
          onClick();

        }else if(result.warning) {
          clearFields();
          setFormattedError({});
          AlertError(result.warning);
          onClick();
          
        }else {
          console.error(result.error);
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
            customInputFieldWrapperClass='mt-[2rem]' 
            fieldLabel='Number Of Reps' 
            fieldIcon='fa-clock' 
            fieldName='reps'
            onChange={handleFieldChange}
            fieldError={formattedError.reps}
            value={formData.reps} 
        />

        <RegularInputFieldNumberTemplate 
            customInputFieldWrapperClass='mt-[2rem]' 
            fieldLabel='Number Of Sets' 
            fieldIcon='fa-dumbbell' 
            fieldName='sets'
            onChange={handleFieldChange}
            fieldError={formattedError.sets}
            value={formData.sets} 
        />

        <CheckFieldsTemplate 
            options={scheduleOptions} 
            setFormData={setFormData}
            formData={formData}
            customInputFieldWrapperClass='mt-[2rem]' 
            fieldLabel='Schedule'
            fieldName='schedule'
            fieldError={formattedError.schedule}
        />

        <ButtonSolidTemplate 
            solidButtonCustomClass='mt-[2rem] w-[100%] text-white hover:bg-transparent hover:border-[var(--red-color)] hover:text-black' 
            buttonLabel='Submit' 
            onClick={submit}
        />
      </form>
    </div>
  )
}

export default AddToRoutineModal
