import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/Utils/404";
import Discussion from "./components/Discussion";
import Footer from "./components/Footer";
import Group from "./components/Group";
import GroupSearchResult from "./components/GroupSearchResult";
import Chat from "./components/GroupChat/Chat/Chat";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Dashboard from "./components/Dashboard";
import MainPage from "./components/MainPage";
import Navbar from "./components/NavBar/Navbar";
import Post from "./components/Posts/Post/Post";
import ToDo from "./components/Utils/ToDo";
import UserContextProvider from "./context/User";


import  {useDispatch} from "react-redux";
import  {getPosts} from './actions/posts'
import PostForm from "./components/Form/PostForm";

function App() {

    return (
        <React.StrictMode>
            <UserContextProvider>
                <BrowserRouter>

                    <Navbar />
                    <div style={{
                        height: '90vh',
                        width: '100%',
                        minHeight: '500px',
                        // overflow: 'clip'
                    }}>
                        <Routes>
                            <Route index path='/' element={<MainPage />} />

                            <Route path='/discussion' >
                                <Route index element={<Discussion />} />
                                <Route path='/discussion/create' element={<PostForm />} />
                                <Route path='/discussion/post/:postId' element={<Post />} />
                            </Route>


                            <Route path='/group'>
                                <Route index element={<Group />} />
                                <Route path='/group/chat' element={<Chat />} />
                                <Route path='/group/search-result' element={<GroupSearchResult />} />
                            </Route>


                            <Route path='/login' element={<Login />} />
                            <Route path='/logout' element={<Logout />} />

                            <Route path='/dashboard' element={<Dashboard />} />

                            {/* TODO */}
                            <Route path='/profile' element={<ToDo />} />
                            <Route path='/settings' element={<ToDo />} />
                            <Route path='/notifications' element={<ToDo />} />

                            {/* Errors */}
                            <Route path='/*' element={<PageNotFound />} />

                        </Routes>
                    </div>
                    <Footer />

                </BrowserRouter>
            </UserContextProvider>
        </React.StrictMode>
    );
}

export default App;
