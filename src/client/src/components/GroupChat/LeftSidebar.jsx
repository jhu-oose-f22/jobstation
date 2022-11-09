
export default function LeftSidebar() {
    return <div className="bg-dark d-flex flex-column justify-content-between align-items-between h-100 col-2 w-100">
        <ul className="list-group py-3" role="tablist">

            {/* Chat */}
            <button className="btn btn-dark p-3 active my-2 text-start rounded-0"
                type="button"
                data-bs-toggle="list"
                data-bs-target="#chatpage"
                role="tab"
                aria-controls="chatpage"
            >
                <i className="fa-regular fa-comments me-2"></i>
                Chat
            </button>

            {/* Chat */}
            <button className="btn btn-dark p-3 text-start rounded-0"
                data-bs-toggle="list" data-bs-target="#other" role="tab" aria-controls="other"
            >
                ...
            </button>

        </ul>
    </div>
}