import React from "react";

const CommitList = ({ commits }) => {
  return (
    <div>
      {!!commits ? (
        // If there ARE commits
        <div className="card mb-3">
          <div className="card-header">
            <span className="text-light">Commits</span>
          </div>
          <div className="card-body">
            {commits &&
              commits.map((commit) => (
                <p className="pill mb-3" key={commit._id}>
                  {commit.commitText} {"// "}
                  {commit.username} on {commit.createdAt}
                </p>
              ))}
          </div>
        </div>
      ) : (
        // If there are no commits
        <p>No Commits Yet!</p>
      )}
    </div>
  );
};

export default CommitList;
