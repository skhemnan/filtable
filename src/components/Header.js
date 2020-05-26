import React from 'react'
import Logo from '../assets/logo.png'
import '../App.css'

const Header = () => {
	return (
		<div className = 'header'>
		<img className = 'logo' src={Logo} />
		</div>
	)
}

export default Header
