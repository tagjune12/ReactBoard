import { Routes, Route } from 'react-router';
import PostListPage from '@pages/PostListPage';
import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import WritePostPage from '@pages/WritePostPage';
import PostModifyPage from '@pages/PostModifyPage';
import Header from '@components/ui/Header';
import PostViewer from '@components/post/PostViewer';
import Footer from '@components/ui/Footer';
import SEO from '@components/common/SEO';

import '@styles/index.scss';
import pages from '@assets/data/page.json';

function App() {
  return (
    <>
      <SEO title="Write Anything!" />
      <div className="App">
        <Header pages={pages} />
        <div className="layout-container">
          <div className="thumbnail">
            <div className="main-title">Write Anything!</div>
            <div className="sub-title">아무거나 써도 좋습니다!</div>
          </div>
          <main className="main-content">
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
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
