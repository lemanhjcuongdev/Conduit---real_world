import { MouseEventHandler } from "react";

interface IFollowBtnProps {
  username: string;
  isFollowing: boolean;
  handleFollow: MouseEventHandler;
}

function FollowButton(props: IFollowBtnProps) {
  const { username, isFollowing, handleFollow } = props;

  return (
    <button
      className={
        isFollowing
          ? "btn btn-sm action-btn ng-binding btn-secondary"
          : "btn btn-sm btn-outline-secondary action-btn"
      }
      onClick={handleFollow}
    >
      <i className="ion-plus-round"></i>
      &nbsp; {isFollowing ? "Unfollow" : "Follow"} {username}
    </button>
  );
}

export default FollowButton;
