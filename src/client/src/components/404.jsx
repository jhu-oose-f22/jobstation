
export function PageNotFound() {
    return <div className="p-5 text-start bg-light vh-100" style={{}}>
        <h1 className="mb-3">
            <i className="fa fa-regular fa-circle-exclamation me-2" color='red'></i>
            404 Not Found.</h1>
        <h2 className="mb-3">Oops! Looks like we are in an outer space.</h2>
        <a className="btn btn-warning text-muted" href="/" role="button">Back to Main Page</a>
    </div>
}