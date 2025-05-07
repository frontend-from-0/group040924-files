import "./App.css";
import { useState } from "react";
import { ProfilePage } from "./pages/ProfilePage";
import { MainPage } from "./pages/MainPage";

const pages = {
  home: "Home",
  profile: "Profile",
};

function App() {
  const [currentPage, setCurrentPage] = useState(pages.home);

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <button onClick={() => setCurrentPage(pages.home)}>
              {pages.home}
            </button>
          </li>
          <li>
            <button onClick={() => setCurrentPage(pages.profile)}>
              {pages.profile}
            </button>
          </li>
        </ul>
      </nav>
      {currentPage === pages.home && (
        <MainPage />
      )}
      {currentPage === pages.profile && <ProfilePage />}
    </div>
  );
}

export default App;
