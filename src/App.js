import React from 'react'
import ConverterContextProvider from './context/ConverterContext'
import './App.css'
import Header from './components/Header'
import Form from './components/Form'
import FieldList from './components/FieldList'

const App = () => {
	return (
		<div className = 'main'>
		<ConverterContextProvider>
		<Header/>
		<Form/>
		<FieldList/>
		</ConverterContextProvider>
		</div>
	)
}

export default App

