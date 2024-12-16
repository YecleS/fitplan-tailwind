import React from 'react';
import '../styles/PageHeader.css'

const PageHeader = ({pageTitle, pageDescription}) => {
  return (
    <div className='page__header w-[100%] h-[23vh] relative flex flex-col items-center justify-center'>
        <h1 className='text-white font-[700] text-[1.4rem] md:text-[1.8rem]'>{pageTitle}</h1>
        <p className='text-white font-[500] text-[0.8rem] md:text-[1rem]'>{pageDescription}</p>
    </div>
  )
}

export default PageHeader
