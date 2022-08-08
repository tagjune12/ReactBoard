import { Routes, Route } from 'react-router';
import PostListPage from '@pages/PostListPage';
import LoginPage from '@pages/LoginPage';
import SignupPage from '@pages/SignupPage';
import WritePostPage from '@pages/WritePostPage';
import PostModifyPage from '@pages/PostModifyPage';
import Header from '@components/ui/Header';
import PostViewer from '@components/post/PostViewer';
import Footer from '@components/ui/Footer';

import '@styles/index.scss';
import pages from '@assets/data/page.json';
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    <>
      <Helmet>
        <title>Write Anything!</title>
      </Helmet>
      <div className="App">
        <Header pages={pages} />
        <div className="thumbnail">
          <div className="main-title">Write Anything!</div>
          <div className="sub-title">아무거나 써도 좋습니다!</div>
        </div>
        {/* <NavBar pages={pages} /> */}
        <main>
          <div className="main-content">
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
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
