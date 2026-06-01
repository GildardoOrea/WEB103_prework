import React from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom'; // <-- 1. Import Link from React Router

const ShowCreators = ({ creators }) => {
    return (
        <div className="show-creators-page">
            <h2>The Creatorverse</h2>
            
            {/* 2. Add this button to navigate to the AddCreator form */}
            <Link to="/new">
                <button>Add a Creator</button>
            </Link>
            
            <div className="creator-container">
                {creators && creators.length > 0 ? (
                    creators.map((creator) => (
                        <Card 
                            key={creator.id}
                            id={creator.id}
                            name={creator.name}
                            url={creator.url}
                            description={creator.description}
                            imageURL={creator.imageURL}
                        />
                    ))
                ) : (
                    <h3>No content creators found in the database! Go add some!</h3>
                )}
            </div>
        </div>
    );
};

export default ShowCreators;