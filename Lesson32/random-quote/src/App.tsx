import { useState } from "react";
import { ProfilePage } from "./pages/ProfilePage";
import { MainPage } from "./pages/MainPage";

enum Page {
  home = "Home",
  profile = "Profile",
  settings = 'Settings',
};

const allPages = Object.values(Page);

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.home);

  return (
    <div className='bg-white dark:bg-slate-800'>
      <nav className='bg-slate-400 text-slate-900' >
        <ul className="flex gap-5 justify-end max-w-5xl"> 
          {allPages.map( page => (
            <li>
            <button className={'py-2.5 px-3'} onClick={() => setCurrentPage(page)}>
              {page}
            </button>
          </li>
          ))}
        </ul>
      </nav>

      {currentPage === Page.home && (
        <MainPage />
      )}
      {currentPage === Page.profile && <ProfilePage />}
      {currentPage === Page.settings && <p>Settings</p>}
    </div>
  );
}

export default App;
