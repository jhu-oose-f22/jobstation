import { useContext } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import { UserContext } from "../../context/User";
import GroupCard from "./GroupCard";

export default function GroupList({ listName }) {

    const { user } = useContext(UserContext);

    let groups, groupTitle;
    // TODO retrieve groups
    // TODO throttle all groups
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
            groupname: 'Amazon VO',
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
        return <li className="list-group" key={group.groupId}>
            <Link className="text-decoration-none" to='./chat' state={{
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
        // return <Navigate to='/' />;
    }

    let isCollapse = '';

    const handleCollapse = () => {

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
        <div className="collapse accordion-collapse show" id={`${listName}body`}>
            <ul className=" d-flex overflow-auto flex-wrap">
                {groups}
            </ul>
        </div>

    </div>
}