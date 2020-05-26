import React, {createContext,useState} from 'react'
import Flatten from 'flat'
import { v1 as uuid } from 'uuid'

export const ConverterContext = createContext()

const ConverterContextProvider = props => {
	/* 
	 Initialize two new empty arrays. 
	   - The first one will get the keys of the JSON object and populate into this array which will then render into the checkbox 
		   to select which fields user wants. 
		 - Second Array is the API request's response body. It will be used to generate keys as well as grab the data for the csv
	*/
	const [fields, setFields] = useState([])
	const [resData, setResData] = useState([])
		
	// Function that handles the API and gets the response data
	const getData = async (url) => {
		// Simple fetch from URL box on client, passes apiRes to next function
	  let apiReq = await fetch(url)
		let apiRes = await apiReq.json()
		generateFields(apiRes)
	}

	// Function that takes in the API result and gets all the fields of the JSON, pushes it to fields array
	const generateFields = apiRes => {
		let flattened = []
		let fieldList = []	
		let data = []
		Object.values(apiRes).map(field => {
			if(Array.isArray(field) && typeof field[0] === 'object'){
				data = field.map(x => x)
				flattened = Object.keys(Flatten(field[0])); 			
			} else if (Array.isArray(apiRes) && typeof apiRes[0] === 'object') {
				data = apiRes
				flattened = Object.keys(Flatten(apiRes[0])); 			
			}})
			let keys = flattened.map(item => item.replace(/\.(?=[0-9])/g, '[').replace(/\[[0-9]/g,'$&]'))
		  keys.map(key => {let obj = { id: uuid(), title: key, selected: false }; fieldList.push(obj)})
			setFields(fieldList)
			setResData(data)
	}

	// Handle Checked function. Updates the fields array to reflect which fields were selected by user. 	
	 const handleChecked = id => {
		 let updatedFields = fields.map(field =>{if(field.id === id){field.selected = !field.selected} return field})
		 setFields(updatedFields)
	}

	// Function that is called by clicking the "Generate CSV" button. 	
	const createFilteredArray = () => {
    // Accepts fields array, filters it by ,checked:true, passes newFieldList array to analyzeData
		 let filteredFieldList = fields.filter(field => field.selected === true)
		 let newFieldList = filteredFieldList.map(field => field.title)
		 analyzeData(newFieldList)
	}

	// Function that analyzes data and maps filtered array to resData to create new array of objects for CSV
	const analyzeData	= newFields => {
		let csvData = []
	  let flattened = resData.map(item => Flatten(item))
		flattened.forEach(item => {
			let obj = {}
			let finalObj = {}
			let keys = Object.keys(item).map(key => key.replace(/\.(?=[0-9])/g, '[').replace(/\[[0-9]/g,'$&]'))
			let values = Object.values(item)
			for(let i=0;i<keys.length;i++){
					obj[keys[i]] = `${values[i]}`
			}
			let objKeys = Object.keys(obj)
			newFields.forEach(field => {
				let currentField = field.toString()
				let foundKey = objKeys.find(key => key === currentField)
				finalObj[foundKey] = `${obj[foundKey]}`
			})
			csvData.push(finalObj)
		})
		convertToCSV(csvData)
	}
	
	// Function that converts csvData to a csv file. Pass to function that will generate a download link for the CSV
	const convertToCSV = data => {
		let rows = []
		let headers = Object.keys(data[0])
		rows.push(headers.join(','))
		for(let row of data){
			let escaped = ''
			let values = headers.map(header => {
				if(typeof row[header] === 'undefined'){
					escaped = "Not Found"
				}else{
					escaped = row[header].toString().replace(/"/g, '\\"')
			 }
			 return `"${escaped}"`
			})
			rows.push(values.join(','))
		}
		let csv = rows.join('\n')
		createDL(csv)
	}
	
 // Function that takes the CSV file and generates a download link. Called when "Download File" is clicked client-side
	const createDL = csv => { 
	 let link = document.createElement("a");
	 link.classList.add("dn");
	 let encodedData = encodeURI("data:text/csv;charset=utf-8," + csv);
	 link.setAttribute("href", encodedData);
	 link.setAttribute("download", "filtable_report.csv");
	 document.body.appendChild(link);
	 link.click(); 
 } 

	return (
		<ConverterContext.Provider value={{
						fields, 
						resData,
						getData, 
						generateFields, 
						handleChecked, 
						createFilteredArray, 
						//analyzeData,
						//convertToCSV, 
						//createDL
		}}>
		{props.children}
		</ConverterContext.Provider>
	)

}

export default ConverterContextProvider;
