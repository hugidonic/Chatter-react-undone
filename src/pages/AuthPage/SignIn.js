import React, { useState } from 'react';

const SignIn = (props) => {	
	const [form, setForm] = useState({
		nickname: '',
		password: ''
	})

	const handleChange = (e) => {
		const { id, value } = e.target;

		setForm({
			...form,
			[id]: value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault()
		props.handleLogin(form)
	};

	const keyPress = (e) => {
		if (e.key === 'Enter') {
			handleSubmit(e)
		}
	};

	return (
		<div className="form-panel one" >
			<div className="form-header">
				<h1>Войти</h1>
			</div>

			<form onSubmit={handleSubmit} onKeyPress={keyPress}>
				<div className="input-field form-group">
					<label htmlFor="nickname">Никнейм</label>
					<input
						id="nickname"
						type="text"
						placeholder="Введите никнейм..."
						value={form.nickname}
						onChange={handleChange}
					/>
				</div>

				<div className="input-field form-group">
					<label htmlFor="password">Пароль</label>
					<input
						id="password"
						type="password"
						placeholder="Пароль..."
						value={form.password}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<button type="submit" className="btn authBtn" onClick={handleSubmit}>
						Войти
					</button>
				</div>
			</form>
		</div>
	);
}

export default SignIn;
