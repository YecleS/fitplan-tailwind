import React, { useState } from 'react';
import '../styles/InputFieldsTemplate.css';

export const RegularInputFieldTemplate = ({ fieldLabel, fieldIcon, customInputFieldClass, fieldName, onChange, placeholder, fieldError}) => {
  return (
    <div className='regular-input-field relative '>
      <p className='regular-input-field__label text-[0.9rem] font-[500] lg:text-[1rem]'>{fieldLabel}</p>

      <div className='regular-input-field__field-wrapper relative mt-2'>
        <i className={`regular-input-field__icon fa-solid ${fieldIcon} text-lg text-[#F51B31]`}></i>
        <input type='text' name={fieldName} onChange={onChange} placeholder={placeholder}
          className={`regular-input-field__input-field ${customInputFieldClass} text-[0.9rem] py-[0.5em] pl-[2.5rem] pr-[1rem] rounded-[5px] outline-none lg:text-[0.95rem]`}
        />
      </div>
      
      {fieldError && <p className='regular-input-field__error text-[0.80rem] text-[#F51B31] absolute left-[0] bottom-[-1.5rem]'>{fieldError}</p>}
    </div>
  )
}

export const RegularInputFieldNumberTemplate = ({ customInputFieldWrapperClass, fieldLabel, fieldIcon, fieldName, onChange, placeholder, customInputFieldClass, value, fieldError}) => {
  return (
    <div className={`regular-input-field relative ${customInputFieldWrapperClass}`}>
      <p className='regular-input-field__label text-[0.9rem] font-[500] lg:text-[1rem]'>{fieldLabel}</p>

      <div className='regular-input-field__field-wrapper relative mt-2'>
        <i className={`regular-input-field__icon fa-solid ${fieldIcon} text-lg text-[#F51B31]`}></i>
        <input type='number' name={fieldName} onChange={onChange} placeholder={placeholder} value={value}
           className={`regular-input-field__input-field ${customInputFieldClass} text-[0.9rem] py-[0.5em] pl-[2.5rem] pr-[1rem] rounded-[5px] outline-none lg:text-[0.95rem]`}
        />
      </div>
      
      {fieldError && <p className='regular-input-field__error text-[0.80rem] text-[#F51B31] absolute left-[0] bottom-[-1.5rem]'>{fieldError}</p>}
    </div>
  )
}


export const PasswordInputFieldtemplate = ({ fieldLabel, fieldName, onChange, placeholder, fieldError}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='password-input-field relative'>
      <p className='password-input-field__label text-[0.9rem] font-[500] lg:text-[1rem]'>{fieldLabel}</p>

      <div className='password-input-field__field-wrapper relative mt-2'>
        <i className="fa-solid fa-lock absolute text-lg text-[#F51B31] "></i>
        <input type={!showPassword ? 'password':'text'} name={fieldName} onChange={onChange} placeholder={placeholder} 
          className='password-input-field__input-field text-[0.9rem] py-[0.5em] pl-[2rem] pr-[1rem] rounded-[5px] outline-none lg:text-[0.95rem]' 
        />
        <i className={`fa-solid ${!showPassword ? 'fa-eye':'fa-eye-slash'} absolute text-lg`} onClick={() => setShowPassword(!showPassword)}></i>
      </div>

      {fieldError && <p className='password-input-field__error text-[0.80rem] text-[#F51B31] absolute left-[0] bottom-[-1.5rem]'>{fieldError}</p>}
    </div>
  )
}



export const CheckFieldsTemplate = ({ customInputFieldWrapperClass, fieldLabel, fieldName, options = [], setFormData, formData, fieldError}) => {

  const handleCheckboxChange = (value) => {
    const selectedOptions = formData[fieldName] || [];

    const updatedOptions = selectedOptions.includes(value)
    ? selectedOptions.filter((option) => option !== value)
    : [...selectedOptions, value];

    setFormData({
      ...formData,
      [fieldName]: updatedOptions
    })
  }

  return (
    <div className={`regular-input-field relative ${customInputFieldWrapperClass}`}>
      <p className='regular-input-field__label text-[0.9rem] font-[500] lg:text-[1rem]'>{fieldLabel}</p>

      <div className='relative mt-2 flex flex-col justify-start'>
        {
          options.map((options, index) => (
            <label key={index} className='ml-[1rem]'>
              <input type='checkbox' 
                value={options.value} 
                checked={formData[fieldName].includes(options.value)} 
                onChange={() => handleCheckboxChange(options.value)}
                name={fieldName}
              />

              <span className="ml-[0.5rem]">{options.label}</span>
            </label>
          ))
        }
      </div>
      
      {fieldError && <p className='regular-input-field__error text-[0.80rem] text-[#F51B31] absolute left-[0] bottom-[-1.5rem]'>{fieldError}</p>}
    </div>
  )
}

