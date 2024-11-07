import React from 'react';

export const ButtonSolidTemplate = ({ type, onClick, buttonLabel, solidButtonCustomClass}) => {
  return (
    <>
        <button
          type={type} 
          className={`button-solid-template text-sm font-[600] py-2 px-4 rounded outline-none bg-[var(--red-color)] border-solid border-[1px] border-[transparent] transition-all duration-[0.3s] ease-in-out ${solidButtonCustomClass} lg:text-base`} 
          onClick={onClick}
        >
          {buttonLabel}
        </button>
    </>
  )
}

export const ButtonTransparentTemplate = ({ type, onClick, buttonLabel, transparentButtonClass}) => {
    return (
      <>
          <button
            type={type} 
            className={`button-transparent-template text-sm font-[600] py-2 px-4 rounded-md outline-none bg-transparent border-solid border-[1px] border-[var(--red-color)] transition-all duration-[0.3s] ease-in-out ${transparentButtonClass} lg:text-base`} 
            onClick={onClick}
          >
            {buttonLabel}
          </button>
      </>
    )
  }

