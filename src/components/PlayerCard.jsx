import React, { useEffect, useState } from 'react'
import moment from 'moment'
import '../styles/PlayerCard.css'

const PlayerCard = ({ player }) => {
    const { PFName, SkillDesc, Value, UpComingMatchesList, Id } = player
    const [image, setImage] = useState('')

    useEffect(() => {
        loadImage(Id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const UpComingMatches = UpComingMatchesList[0].CCode ? (
        <>
            {UpComingMatchesList[0].CCode}
            <span> VS </span>
            {UpComingMatchesList[0].VsCCode}
            <br />
            {/* {UpComingMatchesList[0].MDate} */}
            {moment(UpComingMatchesList[0].MDate.toString()).format('DD-MM-YYYY h:mm:ss a')}
        </>
    ) : (
        'Not Available'
    )

    const loadImage = (id) => {
        if (id === '99690') return
        import(`../assets/player-images/${id}.jpg`).then((image) => setImage(image.default))
    }

    return (
        <div className='player-card'>
            <div className='player-card-header'>
                <p className='player-name'> {PFName}</p>
                <p className='player-skill'>{SkillDesc}</p>
            </div>
            <div className='player-card-body'>
                <div className='player-details'>
                    <p className='player-value'>
                        <span>Value</span>
                        <span>$</span> {Value}
                    </p>
                    <p className='upcoming-match'>
                        <span>Upcoming Matches</span> <br />
                        {UpComingMatches}
                    </p>
                </div>

                <div className='player-profile'>
                    <img src={image} alt='player-profile' />
                </div>
            </div>
        </div>
    )
}

export default PlayerCard
