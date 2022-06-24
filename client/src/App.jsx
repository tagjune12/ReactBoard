import { Routes, Route } from 'react-router';
import PostList from '@pages/PostList';
import Header from '@components/ui/Header';
import OffCanvas from '@components/ui/OffCanvas';
import PostView from '@components/PostList/PostView';
import pages from '@assets/data/page.json';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <OffCanvas pages={pages} />
        <main>
          <Routes>
            <Route path="/" element={<PostList />}>
              <Route path="/post/:id" element={<PostView />} />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
