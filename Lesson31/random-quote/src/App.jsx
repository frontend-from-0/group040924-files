import { useState } from "react";
import { ProfilePage } from "./pages/ProfilePage";
import { MainPage } from "./pages/MainPage";

const pages = {
  home: "Home",
  profile: "Profile",
};

function App() {
  const [currentPage, setCurrentPage] = useState(pages.home);

  const navButtonClasses = 'py-2.5 px-3';

  return (
    <div className='bg-white dark:bg-slate-800'>
      <nav className='bg-slate-400 text-slate-900' >
        <ul className="flex gap-5 justify-end max-w-5xl"> 
          <li>
            <button className={navButtonClasses} onClick={() => setCurrentPage(pages.home)}>
              {pages.home}
            </button>
          </li>
          <li>
            <button className={navButtonClasses} onClick={() => setCurrentPage(pages.profile)}>
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
