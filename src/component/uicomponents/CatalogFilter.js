import React from 'react';
import { ButtonSolidTemplate } from '../uicomponents/ButtonTemplate'

const CatalogFilter = ({filterForm, setFilterForm, clearFilters}) => {

  const handleOnChange = (e) => {
    const {name, value} = e.target;

    setFilterForm({
      ...filterForm,
      [name]: value
    })
  }

  return (
    <div className='flex flex-col gap-[1rem] p-[1.5rem] bg-white rounded' style={{ boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.6)' }}>
        <div className='w-[200px] relative'>
            <p className='absolute top-[-10px] left-[5px] bg-white block px-[0.5rem] text-[0.85rem] font-[600]'>Category</p>
            <select onChange={handleOnChange} value={filterForm.category} name='category' className='w-[100%] rounded border-[1px] border-solid border-black text-[0.9rem] px-[1rem] py-[0.5rem]'>
                <option value=''></option>
                <option value='calisthenics'>Calisthenics</option>
                <option value='weightlifting'>Weightlifting</option>
            </select>
        </div>

        <div className='w-[200px] relative mt-[1rem]'>
            <p className='absolute top-[-10px] left-[5px] bg-white block px-[0.5rem] text-[0.85rem] font-[600]'>Difficulty</p>
            <select onChange={handleOnChange} value={filterForm.difficulty} name='difficulty' className='w-[100%] rounded border-[1px] border-solid border-black text-[0.9rem] px-[1rem] py-[0.5rem]'>
                <option value=''></option>
                <option value='beginner'>Beginner</option>
                <option value='intermediate'>Intermediate</option>
                <option value='advanced'>Advanced</option>
            </select>
        </div>

        <div className='w-[200px] relative mt-[1rem]'>
            <p className='absolute top-[-10px] left-[5px] bg-white block px-[0.5rem] text-[0.85rem] font-[600]'>Target Muscle</p>
            <select onChange={handleOnChange} value={filterForm.target_muscle} name='target_muscle' className='w-[100%] rounded border-[1px] border-solid border-black text-[0.9rem] px-[1rem] py-[0.5rem]'>
              <option value=''></option>
                <option value='triceps'>Triceps</option>
                <option value='shoulders'>Shoulders</option>
                <option value='chest'>Chest</option>
                <option value='biceps'>Biceps</option>
                <option value='lats'>Lats</option>
                <option value='back'>Back</option>
                <option value='core'>Core</option>
                <option value='abs'>Abs</option>
                <option value='quadriceps'>Quadriceps</option>
            </select>
        </div>

      <ButtonSolidTemplate onClick={clearFilters} solidButtonCustomClass='text-center mt-[1rem] text-white' buttonLabel='Clear Filters' />
    </div>
  )
}

export default CatalogFilter
