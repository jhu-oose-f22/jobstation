import { useContext, useEffect, useState } from "react";
import { isLoggedIn, UserContext } from "../context/User";
import { Link, Navigate } from "react-router-dom";
import Banner from "./Utils/Banner";
import { getAllDiscussions } from "../api/discussion";

export default function Discussion() {
    const { user } = useContext(UserContext);
    const [discussion, setDiscussion] = useState([]);

    useEffect(() => {
        getAllDiscussions((res) => setDiscussion(res));
        console.log(discussion);
    }, [setDiscussion])


    if (!isLoggedIn(user)) {
        return <Navigate to='/login' />;
    }


    // TODO get all discussions

    // This is just a template
    let responds = [
        {
            id: '12u',
            title: "OA",
            tag: ['Meta', 'OA', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
            user: {
                userId: 'asldkjf',
                username: 'wby',
                avatar: null
            },
            createdTime: new Date(),
            updatedTime: new Date(),
            body: `a variant of
            'leetcode 123'
            `,
            comment: [
                {
                    commentId: '13987',
                    user: {
                        username: 'wby'
                    },
                    body: `WOW!`
                },
                {
                    commentId: 'a123',
                    user: {},
                    body: `WOW!`
                },
            ]
        },
        {
            id: '1asdf2u',
            title: "Interview",
            tag: ['Google', 'VO', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
            user: {
                userId: 'asldkjf',
                username: 'By David',
            },
            createdTime: new Date(),
            updatedTime: new Date(),
            body: `TOO HARD!`,
            comment: [
                {
                    commentId: '13987',
                    user: {},
                    body: `WOW!`
                },
            ]
        }
    ];
    // TODO: Extract a Post Card class (Similar to Post.jsx).
    const posts = responds.map((res, idx) => {
        return <li className="list-group-item list-group-item-action" key={idx}>
            <Link to={`./${res.id}`}
                // state need to be removed
                state={res}
                className='text-dark text-decoration-none d-flex flex-column'>
                <div className="d-flex flex-row align-items-center my-2 justify-content-start">
                    <img className="avatar-tiny me-3" width={30}
                        title={`${res.user.username}`}
                        src={(res.user.avatar !== '' && res.user.avatar) || `https://ui-avatars.com/api/?name=${res.user.username}&background=random&bold=true&rounded=true`} alt={`user ${res.user.username}`} />
                    <strong>{res.title}</strong>
                    <div className='text-muted ms-auto'>last updated {`${res.updatedTime.toLocaleTimeString()}  ${res.updatedTime.toLocaleDateString()}`}</div>
                </div>
                <div className="">
                    tags: <strong className="text-muted">{res.tag.slice(0, 5).map((val) => {
                        return <button className="btn btn-outline-secondary btn-sm mx-1" key={val}>
                            {val}
                        </button>
                    })}</strong>
                </div>
                <div className="my-3">{res.body.slice(0, 80)}</div>
            </Link>
        </li>
    })


    return <div className="vh-100">
        <Banner className='h-50' pageName={'discussion'} />
        <div className="container py-3 py-lg-5 container--narrow">
            <div>
                <div className="profile-nav nav nav-tabs pt-2 mb-4">
                    <Link to="#" className="profile-nav-link nav-item nav-link active">Posts</Link>
                </div>

                <ul className="list-group">
                    {posts}
                </ul>

            </div>


        </div></div>

}