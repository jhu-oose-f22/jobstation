
export function PageNotFound() {
    return <div className=" bg-image vh-100" style={{
        backgroundImage: "url(./imgs/404.jpg)",
        backgroundSize: "cover"
    }}>

        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
            <div className="d-flex flex-column justify-content-start align-items-start text-white vh-100 p-5">
                <h1 className="mb-3">
                    <i className="fa fa-regular fa-circle-exclamation me-2" color='red'></i>
                    404 Not Found.</h1>
                <h2 className="mb-3">Oops! Looks like we are in an outer space.</h2>
                <a className="btn btn-outline-warning" href="/" role="button">Back to Main Page</a>
            </div>
        </div>
    </div >
}