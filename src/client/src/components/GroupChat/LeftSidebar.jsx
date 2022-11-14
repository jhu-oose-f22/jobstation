
export default function LeftSidebar() {

    const btnNames = [
        "Chat",
        "Calendar",
    ]

    const btnIcons = [
        <i className="fa-regular fa-comments me-2"></i>,
        <i className="fa-regular fa-calendar-alt me-2"></i>,
    ]

    const buttons = btnNames.map((btnName, i) => {
        return <button className={"btn btn-dark p-3 my-2 text-start rounded-0" + (i === 0 ? " active" : "")}
            type="button"
            data-bs-toggle="list"
            data-bs-target={`#${btnName}`}
            role="tab"
            aria-controls={btnName}
        >
            {btnIcons[i]}
            {btnName}
        </button>
    })

    return <div className="bg-dark d-flex flex-column justify-content-between align-items-between h-100 col-2 w-100">
        <ul className="list-group py-3" role="tablist">

            {buttons}

            {/* teamplate */}
            <button className="btn btn-dark p-3 text-start rounded-0"
                data-bs-toggle="list" data-bs-target="#other" role="tab" aria-controls="other"
            >
                ...
            </button>

        </ul>
    </div>
}