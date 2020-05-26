import React, {useContext} from 'react'
import { ConverterContext } from '../context/ConverterContext'
import Field from './Field'
import '../App.css'

const FieldList = () => {
	const { fields, createFilteredArray } = useContext(ConverterContext);
	return (
		<div>
		{ fields.length ? (
			<div>
			<div className = 'field-list-container'>
			<h3>Select the Fields you want on your CSV: </h3>
			<ul>
			{fields.map(field => {
				return <Field field={field} key={field.id}/>
			})}	
			</ul>
			</div>
			<div className = 'btn-container'>
			<button 
			 onClick={() => createFilteredArray()}
			 className='btn generate-btn'
			>Generate CSV</button>
			</div>
			</div>
			) : null
		}
	  </div>
	)
}

export default FieldList
