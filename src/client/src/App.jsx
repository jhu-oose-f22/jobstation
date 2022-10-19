import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/404";
import Discussion from "./components/Discussion";
import Footer from "./components/Footer";
import Group from "./components/Group";
import Chat from "./components/GroupChat/Chat/Chat";
import Login from "./components/Login";
import Logout from "./components/Logout";
import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import ToDo from "./components/Utils/ToDo";
import UserContextProvider from "./context/User";



function App() {

    return (
        <React.StrictMode>
            <UserContextProvider>
                <BrowserRouter>

                    <Navbar />
                    <Routes>
                        <Route index path='/' element={<MainPage />} />

                        <Route path='/discussion' >
                            <Route index element={<Discussion />} />
                            <Route path='/discussion/:postId' element={<Post />} />
                        </Route>


                        <Route path='/group'>
                            <Route index element={<Group />} />
                            <Route path='/group/chat' element={<Chat />} />
                        </Route>


                        <Route path='/login' element={<Login />} />
                        <Route path='/logout' element={<Logout />} />


                        {/* TODO */}
                        <Route path='/profile' element={<ToDo />} />
                        <Route path='/dashboard' element={<ToDo />} />
                        <Route path='/settings' element={<ToDo />} />
                        <Route path='/notifications' element={<ToDo />} />

                        {/* Errors */}
                        <Route path='/*' element={<PageNotFound />} />

                    </Routes>
                    <Footer />

                </BrowserRouter>
            </UserContextProvider>
        </React.StrictMode>
    );
}

export default App;
