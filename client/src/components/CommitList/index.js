import React from 'react';

const CommitList = ({ commits }) => {
    return (
        <div className="card mb-3">
            <div className="card-header">
                <span className="text-light">Commits</span>
            </div>
            <div className="card-body">
                {commits &&
                    commits.map(commit => (
                        <div>
                            <p className="pill mb-3" key={commit._id}>
                                {commit.commitText} {'// '}
                                {commit.username} on {commit.createdAt}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CommitList;