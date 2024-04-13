import React from "react";

const Post = () => {
  return (
    <div>
      <div className="post">
        <div className="image">
          <img
            src="https://techcrunch.com/wp-content/uploads/2022/09/rl-launch.jpg?w=990&crop=1"
            alt=""
          />
        </div>
        <div className="texts">
          <h2>
            Space Force tees up new ‘responsive space’ mission from Rocket Lab
            and True Anomaly
          </h2>
          <p className="info">
            <a href="" className="author">
              Abhishek Rai
            </a>
            <time>2024-5-12 11:47</time>
          </p>
          <p className="summary">
            Rocket Lab and True Anomaly will attempt to deliver and operate
            space hardware for the military under intentionally tight time
            frames, as part of the Space Force’s push to solicit “tactically
            responsive” space capabilities from commercial companies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
