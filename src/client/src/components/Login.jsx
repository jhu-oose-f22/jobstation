import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Switch from "react-switch";
import { API_URL } from "../context/Const";
import { isLoggedIn, UserContext } from "../context/User";
import Error from "./Utils/Error";
import { TagSelection } from "./Utils/Tag";

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');
    const [tag, setTag] = useState([]);

    const { user, toggleUser, toggleToken } = useContext(UserContext);


    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        if (email === '' || password === '') return;

        axios.post(`${API_URL}/signin`, { email, password }).then(
            (res) => {
                console.log(res.data);
                sessionStorage.setItem('userLogin', JSON.stringify(res.data.result));
                sessionStorage.setItem('token', res.data.token);
                if (remember) {
                    localStorage.setItem('userLogin', JSON.stringify(res.data.result));
                    localStorage.setItem('token', res.data.token);
                }
                toggleUser(res.data.result);
                toggleToken(res.data.token);
            },
            (err) => {
                console.log(err.response.data);
                setError(err.response.data.message);
                console.log(error)
            }
        )
        // localStorage.setItem('userLogin', JSON.stringify(userLogin));
        // toggleUser(userLogin);

    };

    const handleSignup = (e) => {
        e.preventDefault();
        setError('');
        if (email === '' || password === '' || userName === '') return;

        axios.post(`${API_URL}/signup`, { email, password, username: userName }).then(
            (res) => {
                console.log(res.data);
                sessionStorage.setItem('userLogin', JSON.stringify(res.data.result));
                sessionStorage.setItem('token', res.data.token);
                toggleUser(res.data.result);
                toggleToken(res.data.token);
            },
            (err) => {
                console.log(err.response.data);
                setError(err.response.data.message);
            })

    }

    return <div className="d-flex flex-lg-row flex-column align-items-center justify-content-center justify-content-lg-evenly  h-100 overflow-auto">
        <div className="col-auto col-lg-6 d-flex flex-column align-items-center justify-content-center mt-4">
            <img className="me-3 rounded-circle" width='300' src='./imgs/Logo.png' alt='Logo of Job Station' loading="lazy" />
            <div className="d-flex flex-column my-5 mx-3">
                <h1>Preparing for Interview/OA/...?</h1>
                <h2>Job Station is All You Need!</h2>
            </div>
        </div>
        <div className="vr d-none d-lg-block my-lg-auto my-0" style={{ height: "75vh" }}></div>
        <hr className="hr d-block d-lg-none mx-lg-0 mx-auto my-0" style={{ width: "75%" }} />

        {/* Has Logged In */}
        {isLoggedIn(user) ?
            <div className="d-flex flex-column align-items-center m-5 btn-group">
                <h1 className="">{user.username}, You Have Logged In!</h1>
                <div className=" d-flex justify-content-between w-75 mt-5 align-items-center">To
                    <Link to='/discussion' className="btn btn-outline-success text-decoration-none mx-2"> Discussion</Link>
                    <Link to='/group' className="btn btn-outline-danger text-decoration-none me-2"> Group</Link>
                    <Link to='/dashboard' className="btn btn-outline-primary text-decoration-none"> Dashboard</Link>
                </div>

            </div>
            :
            // login
            <div className="col-4 mt-2">
                <h1>Sign
                    <Switch onChange={() => {
                        setIsLogin(!isLogin);
                        setError('');
                        setEmail('');
                        setPassword('');
                        setRemember(false);
                        setUserName('');
                    }} checked={isLogin}
                        height={50}
                        width={110}
                        className="m-2 h-100 text-light"
                        onColor="#57bd97"
                        offColor="#4f92aa"
                        checkedIcon={
                            <div className="h-100  text-center d-flex align-items-center justify-content-center">
                                In
                            </div>
                        }

                        checkedHandleIcon={
                            <i className="fa-regular fa-face-laugh-wink w-100 h-100 text-success"></i>
                        }

                        uncheckedIcon={
                            <div className="h-100  text-center pe-2  d-flex align-items-center justify-content-center">
                                <small>Up</small>
                            </div>
                        }

                        uncheckedHandleIcon={
                            <i className="fa-regular fa-face-laugh-beam w-100 h-100 text-primary"></i>
                        }

                    />
                    right now!</h1>

                {error && error !== '' && <Error error={error} />}

                {isLogin ?
                    // login
                    <form className="col-auto form-group mt-4" onSubmit={handleLogin}>
                        <div className="d-flex flex-column w-100 form-outline mt-4">
                            <label className="form-label">Email</label>
                            <input className=" form-control " type='email' required={true}
                                placeholder='enter email'
                                aria-describedby="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="d-flex flex-column w-100 form-outline my-4">
                            <label className="form-label">Password</label>
                            <input className=" form-control" type='password' placeholder='password' required={true} value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe"
                                value={remember} onChange={e => { setRemember(e.target.value) }} />
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                        <button className="btn btn-primary w-100 my-4 h-100">
                            Sign In
                        </button>
                    </form>
                    :
                    // Sign up
                    <form className="col-auto form-group mt-4" onSubmit={handleSignup}>
                        <div className="d-flex flex-column w-100 form-outline mt-4">
                            <label className="form-label" htmlFor="emailSignUp">Email</label>
                            <input className=" form-control " type='email' required={true} id='emailSignUp'
                                placeholder='enter email'
                                aria-describedby="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="d-flex flex-column w-100 form-outline mt-4">
                            <label className="form-label" htmlFor="nameSignUp">Username</label>
                            <input className=" form-control " type='text' required={true} id='nameSignUp'
                                placeholder='your name'
                                aria-describedby="username"
                                value={userName}
                                onChange={e => setUserName(e.target.value)} />
                        </div>
                        <div className="d-flex flex-column w-100 form-outline my-4">
                            <label className="form-label" htmlFor="passSignUp">Password</label>
                            <input className=" form-control" type='password'
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                placeholder='password' id="passSignUp"
                                required={true}
                                value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </div>
                        <TagSelection tag={tag} setTag={setTag} setError={setError} />
                        <button className="btn btn-success w-100 my-4 h-100">
                            Sign Up
                        </button>
                    </form>

                }
            </div>
        }



    </div >;
}