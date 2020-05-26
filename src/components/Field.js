import React, { useContext } from 'react'
import { ConverterContext } from '../context/ConverterContext'
import '../App.css'


const Field = ({ field }) => {
	const { handleChecked } = useContext(ConverterContext)
	return (
	<li className='field'>
		<button
			 className={field.selected ? 'selected-btn' : 'unselected-btn'}			
			 onClick = {() => handleChecked(field.id)}
		></button>
		<span className = 'field-title'>{field.title}</span>
	</li>
	)
}

export default Field
