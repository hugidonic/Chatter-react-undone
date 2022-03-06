import React, { useEffect, useRef } from 'react';
// Redux
import { connect } from 'react-redux';
import { loginUser, registerNewUser } from '../../redux/actions/userActions';

// hooks
import { message } from '../../hooks';

import './AuthPage.scss';
import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthPage = (props) => {
	
	/* Open and Close register menu */
	
	const ref = React.createRef();
	const formRef = useRef(ref);
	const getRef = () => {
		const form = formRef.current;
		const formToggle = formRef.current.childNodes[0];
		const firstPanel = formRef.current.childNodes[1];
		const secondPanel = formRef.current.childNodes[2];

		return { form, formToggle, firstPanel, secondPanel };
	};

	const handleOpenReg = () => {
		const { form, formToggle, firstPanel, secondPanel } = getRef()
		formToggle.classList.add('visible');
		firstPanel.classList.add('hidden');
		secondPanel.classList.add('active');
		form.classList.add('long');
	};

	const handleCloseReg = () => {
		const { form, formToggle, firstPanel, secondPanel } = getRef()
		formToggle.classList.remove('visible');
		firstPanel.classList.remove('hidden');
		secondPanel.classList.remove('active');
		form.classList.remove('long');
	};

	/* 
	 * Message || Toast messages on scream
	 */
	/* Destructure props */
	const { UI: { errors } } = props;

	/*
	 * Message all errors
	 */
	useEffect(() => {
		if (errors && errors.errors) {
			errors.errors.forEach((err) => {
				message(err.msg);
			});
		} else if (errors && errors.message) {
			message(errors.message)
		}
	},[ errors ]);

	const handleLogin = (form) => {
		try {
			props.loginUser(form);
		} catch (e) {
			console.log('e', e)
			message(e.message);
		}
	};

	const handleRegister = (form) => {
		try {
			props.registerNewUser(form);
		} catch (e) {
			message(e.message);
		}
	};

	return (
		<div className="form" ref={formRef}>
			<div className="form-toggle" onClick={handleCloseReg}>
				<i className="fas fa-times"></i>
			</div>
			<SignIn handleLogin={handleLogin} />
			<SignUp handleRegister={handleRegister} open={handleOpenReg} />
		</div>
	);
};

const mapStateToProps = (state) => ({
	UI: state.UI
});

const mapDispatchToProps = {
	loginUser,
	registerNewUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
