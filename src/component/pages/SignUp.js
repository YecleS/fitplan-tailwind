import React, { useContext, useRef, useState } from 'react';
import '../styles/Signup.css';
import Logo from '../assets/logo.png';
import { RegularInputFieldTemplate, PasswordInputFieldtemplate } from '../uicomponents/InputFieldsTemplate';
import { ButtonSolidTemplate, ButtonTransparentTemplate } from '../uicomponents/ButtonTemplate';
import { AlertError } from '../uicomponents/Alerts';
import * as Yup from 'yup';
import { UserContext } from '../utils/UtilContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../uicomponents/LoadingSpinner';

const SignUp = () => {
  //Consume the context
  const { user, setAndStoreUser } = useContext(UserContext);
  //Navigate hook
  const navigate = useNavigate();
  //Ref for dialog
  const spinnerDialog = useRef();
  //State for containing validation errors
  const [formattedError, setFormattedError] = useState({});
  //State for forms data
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirm_password: ''
  })

  //Validation schema for input fields
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Enter valid email'),
    username: Yup.string().required('Username is required').matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and digits").min(6, 'Minimum of 6 characters'),
    password: Yup.string().required('Password is required').matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and digits").min(6, 'Minimum of 6 characters'),
    confirm_password: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password')], 'Password must match')
  });

  //Function to handle the onChange from input fields
  const handleFieldChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name] : value
    })
  }

  const clearFields = () => {
    setFormData({
      email: '',
      username: '',
      password: '',
      confirm_password: ''
    })
  }

  //Function to handle submition
  const submit = async(e) => {
    e.preventDefault();
    setFormattedError({});
    spinnerDialog.current.showModal();

    if(!user.username){
      try{
        await validationSchema.validate(formData, {abortEarly: false});

        const response = await fetch('https://fit-plan.lovestoblog.com/db_register.php', {
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
      catch(validationError){
        if(validationError && validationError.inner){
          const formatError = {};

          validationError.inner.forEach(error => {
              formatError[error.path] = error.message;
          });
          setFormattedError(formatError);
        }else {
          console.error(validationError);
        }
      }
      finally {
        spinnerDialog.current.close();
      }

      
    }else {
      alert('Someone Is Logged In, Log Out First');
      clearFields();
      navigate('/')
    }
    
  }
  return (
    <div className='signup h-svh flex items-center justify-center relative px-[1rem]'>
      <div className='signup__content-wrapper z-[1] bg-white py-[2rem] px-[1.5rem] rounded-[5px] flex flex-col w-[400px]'>

        <div className='signup__logo-wrapper flex flex-col items-center justify-center gap-2 '>
          <img src={Logo} className='signup__logo-img h-[45px] w-[45px] object-contain lg:h-[45px] lg:w-[45px]'/>
          <p className='signup__logo-text text-xl font-bold lg:text-2xl'>Fit<span className='text-[#F51B31]'>Plan</span></p>
        </div>
        <h2 className='signup__title mt-3 text-3xl font-bold text-center lg:text-4xl lg:mt-5'>Register</h2>

        <form className='mt-3 flex flex-col gap-[1.8rem]' onSubmit={submit}>
          <RegularInputFieldTemplate fieldLabel='Email' fieldIcon='fa-envelope' fieldName='email' placeholder='Email' fieldError={formattedError.email} onChange={handleFieldChange}/>
          <RegularInputFieldTemplate fieldLabel='Username' fieldIcon='fa-user' fieldName='username' placeholder='Username' fieldError={formattedError.username} onChange={handleFieldChange}/>
          <PasswordInputFieldtemplate fieldLabel='Password' fieldName='password' placeholder='Password' fieldError={formattedError.password} onChange={handleFieldChange}/>
          <PasswordInputFieldtemplate fieldLabel='Confirm Password' fieldName='confirm_password' placeholder='Confirm Password' fieldError={formattedError.confirm_password} onChange={handleFieldChange}/>

          <ButtonSolidTemplate
            type='submit' 
            buttonLabel='Register'
            solidButtonCustomClass='text-white mt-3 hover:text-black hover:bg-white hover:border-solid hover:border-1 hover:border-[#F51B31] lg:mt-6' 
          />
        </form>

        <ButtonTransparentTemplate
            onClick={() => navigate('/login')} 
            buttonLabel='Already Have An Account ?' 
            transparentButtonClass='text-black mt-5 hover:text-white hover:bg-[#F51B31] hover:border-solid hover:border-1 hover:border-[transparent]'
          />

      </div>

      <dialog className='bg-black p-[1rem] rounded-[5px]' ref={spinnerDialog} >
        <LoadingSpinner />
      </dialog>  
    </div>
  )
}

export default SignUp
