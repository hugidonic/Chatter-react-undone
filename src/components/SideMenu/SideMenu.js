// React
import React, { useEffect, useCallback } from 'react';
import './SideMenu.scss';
import { Link, NavLink } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/userActions';

// Components
import Picture from '../Picture/Picture';

const SideMenu = (props) => {
	const { logout, menuRef } = props;

	/* 
   * Close sideMenu on click
	 */
	const windowClick = useCallback((e) => {
		const target = e.target;
		if (
					!target.closest('.userChats') 
			&&	!target.closest('.nav__item')
			&&	!target.closest('.sideMenu')
		 ) {
			menuRef.current.classList.remove('nav-active')
			document.removeEventListener('click', windowClick)
		}
	}, [menuRef])

	/* Remove event listener on logout */
	useEffect(() => {
		return () => {
			document.removeEventListener('click', windowClick)
		}
	},[ windowClick ])

	const handleOpenMenu = (e) => {
		const menu = menuRef.current;
		const links = menu.childNodes[1].childNodes;
		const addBtn = menu.childNodes[2]

		addBtn.addEventListener('click', () => {
			menu.classList.remove('nav-active');
		})
		
		/* close menu on window click */
		document.addEventListener('click', windowClick)

		/* close menu on link click */
		links.forEach((link) => {
			link.addEventListener('click', () => {
				menu.classList.remove('nav-active');
				document.removeEventListener('click', windowClick)
			});
		});

		menu.classList.toggle('nav-active');
	};

	return (
		<div className="sideMenu">
			<div className="dots">
				<div />
				<div />
				<div />
			</div>

			<Link to="/profile" className="avatar">
				<Picture />
			</Link>

			<nav className="navMenu">
				{/* <button className="navMenu__item bars" onClick={handleOpenMenu}>
					<i className="fas fa-bars" />
				</button> */}
				<button className="navMenu__item" onClick={handleOpenMenu}>
					<i className="fas fa-comment" />
				</button>
				<NavLink to="/" exact className="navMenu__item">
					<div className="profile">
						<i className="fas fa-user-alt" />
					</div>
				</NavLink>

				<NavLink to="/users" exact className="navMenu__item">
					<i className="fas fa-users" />
				</NavLink>

				<NavLink to="/others" exact className="navMenu__item">
					<i className="fas fa-cog" />
				</NavLink>
			</nav>
			<div className="navMenu__item logout" onClick={() => logout()}>
				<i className="fas fa-sign-out-alt" />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
	logout
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
