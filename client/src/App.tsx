import { Routes, Route } from 'react-router';
import PostList from '@pages/PostList';
import Header from '@components/ui/Header';
import Post from '@components/PostList/Post';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/*" element={<PostList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
