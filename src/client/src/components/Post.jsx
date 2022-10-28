import { useParams, useLocation, Link } from "react-router-dom";
import Tag from "./Utils/Tag";

export default function Post(props) {
    const { postId } = useParams();

    // getState
    const { state } = useLocation();

    if (!state || Object.keys(state).length === 0) {
        // TODO Retrieve postId from server
    }

    return <div className="py-lg-5 py-3 h-100 px-lg-5 py-5 px-3"
        style={
            {
                overflowY: "scroll"
            }}
    >
        <div className="mx-lg-5 my-5">
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
                    <img className="avatar-tiny me-3" width={30}
                        title={`${state.user.username}`}
                        src={(state.user.avatar !== '' && state.user.avatar) || `https://ui-avatars.com/api/?name=${state.user.username}&background=random&bold=true&rounded=true`} alt={`user ${state.user.username}`} />
                    <strong>{state.user.username}</strong>
                    <div className='text-muted ms-auto'>last updated {`${state.updatedTime.toLocaleTimeString()}  ${state.updatedTime.toLocaleDateString()}`}</div>
                </div>
                <Tag tag={state.tag} isHidden={false} />
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
    </div >
}