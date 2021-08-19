import axios from 'axios'
import { useEffect, useState } from 'react'
import PlayerCard from './components/PlayerCard'
import SearchBar from './components/SearchBar'

export default function App() {
    const [playersData, setPlayersData] = useState([])
    const [searchedInput, setSearchedInput] = useState('')

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('players-data'))

        if (data) {
            setPlayersData(data)
        } else {
            fetchGET()
        }
    }, [])

    const fetchGET = async () => {
        const { data } = await axios.get('https://api.npoint.io/20c1afef1661881ddc9c/playerList')

        const sortedData = data.sort((a, b) => a.Value - b.Value)

        setPlayersData(sortedData)
        localStorage.setItem('players-data', JSON.stringify(data))
    }

    const onChangeHandler = (ev) => {
        const { value } = ev.target
        setSearchedInput(value)

        if (!value) {
            const data = JSON.parse(localStorage.getItem('players-data'))
            setPlayersData(data)
        } else {
            const data = playersData.filter(
                ({ PFName, TName }) =>
                    PFName.toLowerCase().includes(value.toLowerCase()) ||
                    TName.toLowerCase().includes(value.toLowerCase())
            )

            setPlayersData(data)
        }
    }

    return (
        <main className='App'>
            <SearchBar value={searchedInput} onChangeHandler={onChangeHandler} />
            <section className='players-gallery'>
                {playersData ? playersData.map((player) => <PlayerCard key={player.Id} player={player} />) : 'loading'}
            </section>
        </main>
    )
}
