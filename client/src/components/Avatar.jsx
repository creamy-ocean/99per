import React, { memo } from "react";

const Avatar = memo(({ url, name }) => (
  <div className="avatar">
    {!!url ? (
      <img src={url} alt="avatar" className="avatar-img" />
    ) : (
      <div className="avatar-txt">{name.substr(0, 2)}</div>
    )}
  </div>
));

export default Avatar;
