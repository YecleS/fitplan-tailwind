import React, { useState, useContext, useRef } from 'react';
import '../styles/Login.css';
import Logo from '../assets/logo.png';
import { RegularInputFieldTemplate, PasswordInputFieldtemplate } from '../uicomponents/InputFieldsTemplate';
import { ButtonSolidTemplate, ButtonTransparentTemplate } from '../uicomponents/ButtonTemplate';
import { AlertError } from '../uicomponents/Alerts';
import * as Yup from 'yup';
import { UserContext } from '../utils/UtilContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../uicomponents/LoadingSpinner';

const Login = () => {
  const { user, setAndStoreUser } = useContext(UserContext);
  //State for containing validation errors
  const [formattedError, setFormattedError] = useState({});
  //Navigate hook
  const navigate = useNavigate();
  //Ref for loading dialog
  const spinnerDialog = useRef();
  //State for containing inputs from fields
  const [formData, setFormData] = useState (
    {
      username:'',
      password:'',
    }
  )

  //Validation schema for input fields
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });


  //Handle inputs from the fields
  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const clearFields = () => {
    setFormData({
      username:'',
      password:'',
    })
  }


  //Function for submition of data
  const submit = async(e) => {
    e.preventDefault();

    if(!user.username){
      setFormattedError({});
      spinnerDialog.current.showModal();

      try {
        await validationSchema.validate(formData, {abortEarly: false});

        const response = await fetch('https://fit-plan.lovestoblog.com/db_login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(formData),
        })

        const result = await response.json();

        if(result.error){
          console.error(result.error);

        }else if(result.warning){
          AlertError(result.warning);

        }else {
          setAndStoreUser(result.fitplanToken);
          clearFields();
          navigate('/');
        }
        
      }

      catch(validationError) {
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
      finally {
        spinnerDialog.current.close();
      }
    }

    else {
        alert('Someone Is Logged In, Log Out First');
        clearFields();
        navigate('/');
    }
  }

  return (
    <div className='login h-svh flex items-center justify-center relative px-[1rem]'>
      <div className='login__content-wrapper z-[1] bg-white py-[2rem] px-[1.5rem] rounded-[5px] flex flex-col w-[400px]'>

        <div className='login__logo-wrapper flex flex-col items-center justify-center gap-2 '>
          <img src={Logo} className='login__logo-img h-[45px] w-[45px] object-contain lg:h-[45px] lg:w-[45px]'/>
          <p className='login__logo-text text-xl font-bold lg:text-2xl'>Fit<span className='text-[#F51B31]'>Plan</span></p>
        </div>
        <h2 className='login__title mt-3 text-3xl font-bold text-center lg:text-4xl lg:mt-5'>Welcome</h2>

        <form className='mt-8 flex flex-col gap-[2rem]' onSubmit={submit}>
          <RegularInputFieldTemplate fieldLabel='Username' fieldIcon='fa-user' fieldName='username' placeholder='Username' fieldError={formattedError.username} onChange={handleFieldChange}/>
          <PasswordInputFieldtemplate fieldLabel='Password' fieldName='password' placeholder='Password' fieldError={formattedError.password} onChange={handleFieldChange}/>
          <ButtonSolidTemplate
            type='submit' 
            buttonLabel='LogIn'
            solidButtonCustomClass='text-white mt-3 hover:text-black hover:bg-white hover:border-solid hover:border-1 hover:border-[#F51B31] lg:mt-6' 
          />
        </form>

          <ButtonTransparentTemplate
            onClick={() => navigate('/signup')} 
            buttonLabel='SignUp' 
            transparentButtonClass='text-black mt-5 hover:text-white hover:bg-[#F51B31] hover:border-solid hover:border-1 hover:border-[transparent]'
          />
      </div>

      <dialog className='bg-black p-[1rem] rounded-[5px]' ref={spinnerDialog}>
        <LoadingSpinner />
      </dialog>  
    </div>
  )
}

export default Login
