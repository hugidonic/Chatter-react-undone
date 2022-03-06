// React
import React from 'react';

// Components
import Picture from '../Picture/Picture';

const UserLinkSkeleton = () => {
	return (
		<div className="userLink">
			<div className="messagePicture">
				<Picture />
			</div>
			<div className="userLinkText">
				<div className="skeletonName"></div>
				<div className="skeletonText"></div>
			</div>
			<div className="skeletonTime userLinkTime"></div>
		</div>
	);
};


export default UserLinkSkeleton;
