interface IFollowBtnProps {
  className: string;
  username: string;
  isFollowing: boolean;
}

function FollowButton(props: IFollowBtnProps) {
  const { className, username, isFollowing } = props;

  return (
    <button className="btn btn-sm btn-outline-secondary action-btn">
      <i className="ion-plus-round"></i>
      &nbsp; {isFollowing ? "Unfollow" : "Follow"} {username}
    </button>
  );
}

export default FollowButton;
