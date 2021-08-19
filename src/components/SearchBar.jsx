import React from 'react'
import '../styles/SearchBar.css'

const SearchBar = ({ value, onChangeHandler }) => {
    return (
        <input
            className='search-bar'
            type='search'
            placeholder='Type player name'
            value={value}
            onChange={onChangeHandler}
        />
    )
}

export default SearchBar
