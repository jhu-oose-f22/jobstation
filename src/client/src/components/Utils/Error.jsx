
export default function Error({ error }) {
    return (
        <div className="w-100 border border-danger border-2 rounded-3 bg-danger bg-opacity-25 p-2">
            <i className="fa-solid fa-triangle-exclamation" color="red"></i>
            <span className="text-danger m-2"
            >{error}</span>
        </div>
    )
}