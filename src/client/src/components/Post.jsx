import { useParams, useLocation, Link } from "react-router-dom";

export default function Post(props) {
    const { postId } = useParams();

    // getState
    const { state } = useLocation();

    if (!state || Object.keys(state).length === 0) {
        // TODO Retrieve postId from server
    }

    return <div className="container py-lg-5 py-3 container--narrow vh-100">
        <div className='d-flex justify-content-between align-items-baseline'>
            <h1>{state.title}</h1>
            <div className='d-flex flex-row align-content-center justify-content-center'>
                <Link to='./edit' className='text-primary col-auto d-flex align-items-center justify-content-center'><i className="fa-solid fa-edit fa-xl"></i></Link>
                <form className='delete-post-button text-danger mx-2 col-auto' data-toggle='tooltip' data-placement="top" title='Delete'
                    onSubmit={() => {
                        console.log('deleted!')
                    }}>
                    <button className="btn">
                        <i className="fas fa-trash fa-xl"></i>
                    </button>
                </form>
            </div>

        </div>

        <div className="text-muted small mb-4">
            <div className="d-flex flex-row align-items-center my-2 justify-content-start">
                <img className="rounded-circle avatar-tiny me-3" width={30} src="https://img.wxcha.com/file/201812/01/c2d3964ccd.jpg" alt='avatar' />
                <strong>{state.title}</strong>
                <div className='text-muted ms-auto'>last updated {`${state.updatedTime.toLocaleTimeString()}  ${state.updatedTime.toLocaleDateString()}`}</div>
            </div>
            <div className="">
                tags: <strong className="text-muted">{state.tag.map((val) => {
                    return <button className="btn btn-outline-secondary btn-sm mx-1" key={val}>
                        {val}
                    </button>
                })}</strong>
            </div>
        </div>

        <div className=' body-content'>
            {state.body}
        </div>

        <hr />

        {/* TODO comments */}
        <ul className="my-5">
            {state.comment.map(val => {
                return <li key={val.commentId}>
                    {val.user.username || "anonymous"}
                    <p>{val.body}</p>

                </li>
            })}
        </ul>

    </div>
}