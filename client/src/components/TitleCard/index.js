import React from 'react';
import { useQuery } from '@apollo/react-hooks';
//change the name of the folder, the function, and the export value.

const TitleCard = () => {

    return (
        <div id="titleCard" className="container">
            <h3>{title}</h3>
            <img src={`images/${title.image}`}
            alt={title.name} 
            />
            <h5>Summary</h5>
            <p>{summary}</p>
            <h6>{collaborators}</h6>
        </div>
    );
}

export default TitleCard;