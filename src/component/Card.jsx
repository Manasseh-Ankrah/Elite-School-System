import { Paper } from '@mui/material';
import React from 'react';
import "../css/Card.css";
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';


function Card({count, title, Icon,clsnm}) {
    return (
        // <Paper elevation={3} className='paper'>
        <div className='card'>
            <div className={clsnm}>
                <div className='card__info'>
                    <h1>{count}</h1>
                </div>
                 {Icon}
                <div className='card__title'>
                    <p>{title}</p>
                </div>
            </div>
            </div>
        // </Paper>
    )
}

export default Card
