import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import AllProfiles from "./pages/AllProfiles";
import MyProfiles from "./pages/MyProfiles";
import NewProfileForm from "./components/NewProfileForm";
import Footer from "./components/Footer";

function App({ profileService }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const onAllProfiles = () => {
    navigate("/");
  };

  const onMyProfiles = () => {
    navigate(`/${user.username}`);
  };

  const onLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <div className="app">
      <Header
        username={user.username}
        onLogout={onLogout}
        onAllProfiles={onAllProfiles}
        onMyProfiles={onMyProfiles}
      />
      <main>
        <Routes>
          (
          <>
            <Route
              exact
              path="/"
              element={<AllProfiles profileService={profileService} />}
            />
            <Route
              exact
              path="/:username"
              element={<MyProfiles profileService={profileService} />}
            />
            <Route
              exact
              path="/:username/newProfile"
              element={
                <NewProfileForm
                  username={user.username}
                  profileService={profileService}
                />
              }
            />
          </>
          )
        </Routes>
      </main>
    </div>
  );
}

export default App;
