import React, { useContext, useState } from 'react'
import { ConverterContext } from '../context/ConverterContext'
import '../App.css'


const Form = () => {
	const { getData } = useContext(ConverterContext)
	const [url, setUrl] = useState('');
	
	const handleChange = e => {
		setUrl(e.target.value)	
	}	
	
	const handleSubmit = e => {
		e.preventDefault()
		getData(url)
		setUrl('')
	}
	
	return (
		 <div className = 'form-container'>
			<form onSubmit={handleSubmit} className = 'form'>
				<input 
				 type="text" 
         placeholder="Paste URL here"
				 onChange={handleChange}
				 value={url}
				 required
				 className = 'url-bar'
				/>
				<button 
					type="submit" 
				  className = 'btn search-btn'
				>Get Fields</button>
			</form>									
		 </div>
  )
}

export default Form
