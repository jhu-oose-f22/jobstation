import { Link } from "react-router-dom";


export function MainPage(props) {

    return <div className='bg-image vh-100'
        style={{
            backgroundImage: "url(./imgs/MainPage.jpg)",
            backgroundSize: "cover"
        }}>
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
            <div className="d-flex flex-column justify-content-start align-items-center text-white vh-100 p-5">
                <img className="w-auto h-50" src="./imgs/LogoTransparent.png" alt="Logo of Job Station" />
                <h1 className="mb-3">Your one-stop job preparation station</h1>
                <Link to='/login'>
                    <i className="fa-solid fa-angles-right fa-4x fa-beat-fade my-5 opacity-75 text-white"></i>
                </Link>
            </div>
        </div>

    </div>
}