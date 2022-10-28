import { useContext } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import { UserContext } from "../../context/User";
import GroupCard from "./GroupCard";

export default function GroupList({ listName, groups = null }) {

    const { user } = useContext(UserContext);

    let groupTitle;
    // TODO retrieve groups
    // TODO throttle all groups
    if (!groups)
        groups = [
            {
                groupId: '23',
                groupname: 'Meta OA 10.1',
                groupMemberCount: 50,
                groupAvatar: null,
                groupIntro: 'This is a group for practicing Meta OA on Oct.1\nThis is a group for practicing Meta OA on Oct.\nThis is a group for practicing Meta OA on Oct.'
            }, {
                groupId: '1',
                groupname: 'System Design',
                groupMemberCount: 1024,
                groupAvatar: null,
                groupIntro: 'This is a group for All System Design'
            }, {
                groupId: '2',
                groupname: 'Amazon VO',
                groupMemberCount: 20,
                groupAvatar: null,
                groupIntro: 'This is a group for preparing for Amazon Vo'
            }, {
                groupId: '3',
                groupname: 'Tiktok',
                groupMemberCount: 20,
                groupAvatar: null,
                groupIntro: 'This is a group for preparing for Amazon Vo'
            }, {
                groupId: '4',
                groupname: 'Amazon VO',
                groupMemberCount: 20,
                groupAvatar: null,
                groupIntro: 'This is a group for preparing for Amazon Vo'
            }
        ].map(group => {
            return <li className=" list-group-item border-0 " key={group.groupId}>
                <Link className="text-decoration-none " to='./chat' state={{
                    name: user.username,
                    room: group.groupname
                }} >
                    <GroupCard group={group} />
                </Link>
            </li>
        })
    switch (listName) {
        case 'recommended':
            groupTitle = 'Recommended for You';
            break;
        case 'join':
            groupTitle = 'Your Groups';
            break;
        case 'all':
            groupTitle = 'All Groups';
            break;
        default:
            return <Navigate to='/' />;
    }



    return <div className="accordion-item py-5 border-0" >
        <div className=" accordion-header my-2" id={listName}>
            <button className="accordion-button  rounded-3 shadow-sm bg-light " type="button"
                data-bs-toggle="collapse" data-bs-target={`#${listName}body`}
                aria-controls={`${listName}body`} aria-expanded="true" aria-label="Toggle"
            >
                <h3 className="ms-3 text-dark">{groupTitle}</h3>
            </button>
        </div>
        <div className="collapse accordion-collapse show list-group" id={`${listName}body`}>
            <ul className=" d-flex overflow-auto flex-wrap"
            >
                {groups}

                {/* ... | + */}
                <li className=" list-group-item border-0 d-flex align-items-center justify-content-center">
                    <div className="card d-flex flex-row p-0 align-content-between justify-content-center shadow-lg"
                        style={
                            {
                                width: 270, height: 200,
                            }}
                    >
                        <button className="btn btn-outline-light w-100 text-center h-100"
                            type='button'
                        >
                            <i className="fa-solid fa-ellipsis fa-5x text-dark text-opacity-25"></i>
                        </button>
                        <button className="btn btn-outline-light w-100 h-100"
                            data-bs-toggle="modal"
                            type='button'
                            data-bs-target={`#addGroupModal${listName}`}
                        >
                            <i className="fa-solid fa-plus fa-5x text-dark text-opacity-25"></i>
                        </button>

                    </div>
                </li>
            </ul>

            {/* modal of + */}
            <div className="modal fade" id={`addGroupModal${listName}`} tabIndex="-1" role="dialog" aria-labelledby={`addGroupModal${listName}Label`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`addGroupModal${listName}Label`}>Modal title</h5>
                            <button type="button" className="btn btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div >
}