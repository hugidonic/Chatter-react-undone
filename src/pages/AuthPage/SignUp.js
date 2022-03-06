import React, { useState } from 'react'

const SignUp = (props) => {

	const {open, handleRegister} = props
	
	const [form, setForm] = useState({
		regNickName: '',
		regPassword: '',
		confirmPassword: ''
	})
	
	const handleChange = e => {
		const {id, value} = e.target;

		setForm({
			...form,
			[id]: value
		});
	}

	const handleSubmit = e => {
		e.preventDefault()
		
		const {regNickName, regPassword, confirmPassword } = form
		handleRegister({ nickname: regNickName, password: regPassword, confirmPassword })
	}
		
	return (
		<div className="form-panel two" onClick={open}>

			<div className="form-header">
				<h1>Регистрация</h1>
			</div>

			<form >
				<div className="input-field form-group">
					<label htmlFor="regNickName">Никнейм</label>
					<input 
						id="regNickName" 
						type="text"
						placeholder='Введите никнейм...'
						value={form.regNickName}
						onChange={handleChange}
					/>
				</div>

				<div className="input-field form-group">
					<label htmlFor="regPassword">Пароль</label>
					<input 
						id="regPassword" 
						type="password"
						placeholder='Пароль...'
						value={form.regPassword}
						onChange={handleChange}
					/>
				</div>

				<div className="input-field form-group">
					<label htmlFor="confirmPassword">Повторите пароль</label>
					<input 
						id="confirmPassword" 
						type="password"
						placeholder='Повторите пароль...'
						value={form.confirmPassword}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<button type="submit" className='btn authBtn' onClick={handleSubmit}>Зарегистрироваться</button>
				</div>

			</form>
		</div>
	)
}



export default SignUp