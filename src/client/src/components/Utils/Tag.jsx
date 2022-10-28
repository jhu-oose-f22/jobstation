

export default function Tag({ tag, isHidden = true }) {
    return <div className="d-flex align-items-center">
        tags:
        <div className={`${isHidden ? "d-flex overflow-hidden" : "d-fluid"}`}>{tag.map((val) => {
            return <button className="btn btn-light  btn-sm mx-1 w-auto text-dark my-1" key={val} title={val}>
                <strong className="small">{val}</strong>
            </button>
        })}</div>
    </div>
}