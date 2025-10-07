import { FC, Fragment } from "react";
import DataReleasesPanel from "components/dataReleases/DataReleasesPanel";

const LandingPage: FC = () => {
  //TODO: use sub in decoded access token to define what data it can see
  return (
    <Fragment>
      <h1>Welcome Back</h1>
      <DataReleasesPanel />
    </Fragment>
  );
};

export default LandingPage;
