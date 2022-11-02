export default function ToDo() {
    return <div className=" bg-image h-100" style={{
        backgroundImage: "url(./imgs/InProgress.jpg)",
        backgroundSize: "cover"
    }}>

        <div className="mask h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
            <div className="container-lg d-flex flex-column justify-content-start align-items-start text-white h-100 p-5">
                <h1 className="mb-3">
                    <i className="fa fa-regular fa-circle-exclamation me-2" color='red'></i>
                    We are currently working on this page...</h1>
                <h2 className="mb-3">Come back later!</h2>
                <a className="btn btn-outline-warning" href="/" role="button">Back to Main Page</a>
            </div>
        </div>
    </div >

}
