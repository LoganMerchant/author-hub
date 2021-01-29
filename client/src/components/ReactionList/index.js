import React from 'react';


const ReactionList = ({ reactions }) => {
    return (
        <div className="card mb-3">
            <div className="card-header">
                <span className="text-light">Reactions</span>
            </div>
            <div className="card-body">
                {reactions &&
                    reactions.map(reaction => (
                        <p className="pill mb-3" key={reaction._id}>
                            {reaction.reactionBody} {'// '}
                            {reaction.username} on {reaction.createdAt}
                        </p>
                    ))}
            </div>
        </div>
    );
};

export default ReactionList;