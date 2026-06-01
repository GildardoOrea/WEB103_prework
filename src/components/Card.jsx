import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, name, url, description, imageURL }) => {
    return (
        <article className="creator-card">
            {imageURL && (
                <img src={imageURL} alt={`Profile of ${name}`} className="creator-img" />
            )}

            <div className="creator-info">
                <h3>{name}</h3>
                <p>{description}</p>

                <a href={url} target="_blank" rel="noopener noreferrer" className="creator-link">
                    Visit Channel
                </a>

                <Link to={`/creator/${id}`}>
                    <button>View Details</button>
                </Link>

                <Link to={`/edit/${id}`}>
                    <button className="secondary">Edit</button>
                </Link>
            </div>
        </article>
    );
};

export default Card;
