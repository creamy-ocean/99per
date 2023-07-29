import React, { memo } from "react";
import Avatar from "./Avatar";

const ProfileCard = memo(({ profile, owner, onDelete, onUsernameClick }) => {
  const { id, username, level, url, text, contact } = profile;
  const interest = profile.interest;

  return (
    <li className="profile">
      <Avatar url={url} name={username} />
      <div className="profile-body">
        <span>
          <span className="username" onClick={onUsernameClick}>
            {username}
          </span>
          <span className="level">{level}</span>
          {owner && (
            <button className="delete-button" onClick={() => onDelete(id)}>
              <i className="fa-regular fa-trash-can"></i>
            </button>
          )}
        </span>
        <span>{text}</span>
        <span className="interest">
          {interest &&
            interest.map((i) => {
              return ` #${i}`;
            })}
        </span>
        <span className="contact">{contact}</span>
      </div>
    </li>
  );
});
export default ProfileCard;
