import './FriendsList.scss';
import { connect } from 'react-redux'
import useMarkup from '../../hooks/useMarkup';

const FriendsList = ({ userFriends, usersOnline, search = 0}) => {
	const friendsMarkup = useMarkup(userFriends, usersOnline, search, false)
	return friendsMarkup
}

const mapStateToProps = (state) => ({
	userFriends: state.user.userFriends,
	usersOnline: state.data.usersOnline,
})



export default connect(mapStateToProps)(FriendsList);
