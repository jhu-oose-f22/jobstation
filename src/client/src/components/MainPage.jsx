import { useContext } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn, UserContext } from "../context/User";


export default function MainPage(props) {

    const { user } = useContext(UserContext);
    let nextPage = '/login';
    if (isLoggedIn(user)) {
        nextPage = '/discussion';
    }

    return <div className='bg-image h-100'
        style={{
            backgroundImage: "url(./imgs/MainPage.jpg)",
            backgroundSize: "cover"
        }}>
        <div className="mask h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
            <div className="d-flex flex-column justify-content-start align-items-center text-white h-100 p-5">
                <img className="w-auto h-50 " src="./imgs/LogoTransparent.png" alt="Logo of Job Station" />
                <h1 className="mb-3 text-center">Your one-stop job preparation station</h1>
                <Link to={nextPage}>
                    <i className="fa-solid fa-angles-right fa-4x fa-beat-fade my-5 opacity-75 text-white"></i>
                </Link>
            </div>
        </div>

    </div>
}
