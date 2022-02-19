import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MyPosts from "./Screens/MyPosts/MyPosts";
import SinglePost from "./Screens/SinglePost/SinglePost";
import CreatePost from "./Screens/SinglePost/CreatePost";

import LandingPage from "./Screens/LandingPage/LandingPage";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import { useState } from "react";
import ProfileScreen from "./Screens/ProfileScreen/ProfileScreen";
import FeedScreen from "./Screens/FeedScreen/FeedScreen";



function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route
          path="/myposts"
          component={({ history }) => (
            <MyPosts search={search} history={history} />
          )}
        />
         <Route path="/post/:id" component={SinglePost} />
        <Route path="/createpost" component={CreatePost} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/feeds" component={FeedScreen} />




        
      </main>
      <Footer />
    </Router>
  );
}

export default App;
