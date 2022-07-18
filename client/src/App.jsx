import { Routes, Route } from 'react-router';
import PostList from '@pages/PostList';
import Header from '@components/ui/Header';
import OffCanvas from '@components/ui/OffCanvas';
import PostView from '@components/post/PostView';
import Login from '@pages/Login';
import SignUp from '@pages/SignUp';
import WritePost from '@pages/WritePost';
import pages from '@assets/data/page.json';
import ModifyPost from '@pages/ModifyPost';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <OffCanvas pages={pages} />
        <div className="page-view">
          <Routes>
            <Route path="/" element={<PostList />}>
              <Route path="/post/:id" element={<PostView />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/write" element={<WritePost />} />
            <Route path="/modify/:id" element={<ModifyPost />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
