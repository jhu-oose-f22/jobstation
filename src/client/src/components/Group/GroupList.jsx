import { Navigate, NavLink } from "react-router-dom";

export default function GroupList({ listName }) {

    let groups, groupTitle;
    // TODO retrieve groups
    groups = [
        {
            groupId: '23',
            groupname: 'Meta OA 10.1',
            groupMemberCount: 50,
            groupAvatar: null,
            groupIntro: 'This is a group for practicing Meta OA on Oct.1'
        }, {
            groupId: '23',
            groupname: 'System Design',
            groupMemberCount: 1024,
            groupAvatar: null,
            groupIntro: 'This is a group for All System Design'
        }, {
            groupId: '23',
            groupname: 'Amazon VO',
            groupMemberCount: 20,
            groupAvatar: null,
            groupIntro: 'This is a group for preparing for Amazon Vo'
        }
    ]
    switch (listName) {
        case 'recommended':
            groupTitle = 'Groups Recommended for You';
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


    return <div className="container py-5">
        <div className="d-flex">
            <h3 className="ms-3 text-muted">{groupTitle}</h3>
            <button className="btn ms-2">
                <i class="fa-solid fa-angle-down"></i>
            </button>
        </div>
        <hr className="hr" />

    </div>
}