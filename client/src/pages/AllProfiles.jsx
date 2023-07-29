import React from "react";
import Profiles from "../components/Profiles";

const AllProfiles = ({ profileService }) => {
  return <Profiles profileService={profileService} addable={true} />;
};

export default AllProfiles;
