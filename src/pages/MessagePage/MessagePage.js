import React from 'react'
import './MessagePage.scss';

import { connect } from 'react-redux'

// Components
import Chat from './Chat'
import Loader from '../../components/Loader/Loader';

const MessagePage = (props) => {

	if (props.userLoading) {
		return <Loader />;
	}
	
	return <Chat {...props} />
}

const mapStateToProps = (state) => ({
	userLoading: state.user.loading,
})

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(MessagePage)
