import React from 'react'
import { Link } from 'react-router-dom'
import { specialityData } from '../assets/assets'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-black' id='speciality'>
      <h1 className='text-3xl font-semibold'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm text-gray-600'>
        Connect with trusted healthcare professionals and book your next appointment effortlessly.
      </p>

      <div className='flex sm:justify-center gap-8 pt-8 w-full overflow-x-auto scrollbar-hide'>
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            className='flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110'
          >
            <div className='w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'>
              <img
                src={item.image}
                alt={item.speciality}
                className='w-full h-full object-cover'
              />
            </div>
            <p className='text-gray-700 font-medium text-sm md:text-base hover:text-primary transition-colors duration-300'>
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu

