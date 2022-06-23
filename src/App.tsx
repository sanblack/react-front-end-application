import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";

import { PostList } from "./post/post-list";
import { initSession } from "./store/session";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initSession() as any);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <PostList />
      </div>
    </div>
  );
}

export default App;
