import React from 'react'
import './SearchBar.scss';
import searchIcon from './search.png'

const SearchBar = ({search, setSearch}) => {
	return (
		<div className='searchBar'>
			<div className='searchField'>
				<input
					type="text"
					className='searchInput'
					value={search}
					placeholder='Поиск...'
					onChange={e => setSearch(e.target.value)}
				/>

				<img src={searchIcon} alt="searchIcon" className='searchIcon'/>
			</div>
		</div>
	)
}

export default SearchBar
 