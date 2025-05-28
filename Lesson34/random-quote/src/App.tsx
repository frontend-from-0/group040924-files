import { useState } from 'react';
import { ProfilePage } from './pages/ProfilePage';
import { MainPage } from './pages/MainPage';
import {PostsPage} from './pages/PostsPage'
import {CreateUserPage} from './pages/CreateUserPage';

enum Page {
  home = 'Home',
  posts = 'Posts',
  profile = 'Profile',
  settings = 'Settings',
  createUserPage = 'Create Account'
}

const allPages = Object.values(Page);

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.home);

  return (
    <div className='bg-white dark:bg-slate-800 min-h-screen'>
      <nav className='bg-slate-400 text-slate-900'>
        <ul className='flex gap-5 justify-end max-w-5xl'>
          {allPages.map((page) => (
            <li>
              <button
                className={'py-2.5 px-3'}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {currentPage === Page.posts && <PostsPage />}
      {currentPage === Page.home && <MainPage />}
      {currentPage === Page.profile && <ProfilePage />}
      {currentPage === Page.createUserPage && <CreateUserPage />}
      {currentPage === Page.settings && <p>Settings</p>}
    </div>
  );
}

export default App;
