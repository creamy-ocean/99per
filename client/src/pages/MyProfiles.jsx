import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Profiles from "../components/Profiles";

const MyProfiles = ({ profileService }) => {
  const { username } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <button
        className="new-profile"
        onClick={() => {
          navigate("newProfile");
        }}
      >
        새로운 프로필 만들기
      </button>
      <Profiles
        profileService={profileService}
        username={username}
        addable={false}
      />
    </>
  );
};

export default MyProfiles;
