import React from 'react'

const Card = (props) => {
  return (
    <div>
        <img src={props.imgUrl} alt=''/>
        <h1 className='text-2xl bg-green-500 P-3 Rounded'> A photo for card</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae, culpa.</p>
    </div>
  )
}

export default Card