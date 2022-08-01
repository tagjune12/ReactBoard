import { Routes, Route } from 'react-router';
import PostListPage from '@pages/PostListPage';
import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import WritePostPage from '@pages/WritePostPage';
import PostModifyPage from '@pages/PostModifyPage';
import Header from '@components/ui/Header';
import OffCanvas from '@components/ui/OffCanvas';
import PostViewer from '@components/post/PostViewer';

import '@styles/index.scss';
import pages from '@assets/data/page.json';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <OffCanvas pages={pages} />
        <div className="page-view">
          <Routes>
            <Route path="/" element={<PostListPage />} />
            <Route path="/:category" element={<PostListPage />}>
              <Route path="/:category/:id" element={<PostViewer />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/write" element={<WritePostPage />} />
            <Route path="/modify/:id" element={<PostModifyPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
