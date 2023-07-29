import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "./Banner";
import SearchForm from "./SearchForm";
import ProfileCard from "./ProfileCard";
import { useAuth } from "../context/AuthContext";

const Profiles = memo(({ profileService, username, addable }) => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tab, setTab] = useState("friends");

  useEffect(() => {
    let obj = username
      ? { username: username }
      : { username: user.username, getAll: "true" };
    profileService
      .getProfiles(obj)
      .then((profiles) => setProfiles([...profiles]))
      .catch(onError);
  }, [profileService, username, user]);

  const onGetProfiles = () => {
    let obj = username
      ? { username: username }
      : { username: user.username, getAll: "true" };
    profileService
      .getProfiles(obj)
      .then((profiles) => setProfiles([...profiles]))
      .catch(onError);
  };

  const onFilter = (filters) => {
    profileService
      .filterProfiles(filters, user.username, user.gender)
      .then((profiles) => setProfiles([...profiles]))
      .catch(onError);
  };

  const onDelete = (profileId) => {
    if (window.confirm("프로필을 삭제하시겠습니까?")) {
      profileService
        .deleteProfile(profileId)
        .then(() =>
          setProfiles((profiles) =>
            profiles.filter((profile) => profile.id !== profileId)
          )
        )
        .catch((error) => setError(error.toString()));
    }
  };

  const onError = (error) => {
    setError(error.toString());
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <div className="search-form">
      {addable && (
        <SearchForm
          tab={tab}
          profileService={profileService}
          onGetProfiles={onGetProfiles}
          onFilter={onFilter}
        />
      )}
      {error && <Banner text={error} isAlert={true} transient={true} />}
      {profiles.length === 0 && (
        <p className="profiles-empty">프로필이 없습니다</p>
      )}
      <ul className="profiles">
        {profiles.map((profile) => (
          <ProfileCard
            tab={tab}
            key={profile.id}
            profile={profile}
            owner={profile.username === user.username}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
});
export default Profiles;
