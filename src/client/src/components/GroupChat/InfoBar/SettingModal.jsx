import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/User";
import { TagSelection } from "../../Utils/Tag";
import Error from "../../Utils/Error";
import axios from "axios";
import { API_URL } from "../../../context/Const";

export default function SettingModal({ group, setGroup }) {

    const { user } = useContext(UserContext);
    const readOnly = false //user.username !== group.owner;

    const [groupName, setGroupName] = useState(group.groupName);
    const [groupTags, setGroupTags] = useState(group.tags);
    const [groupDescription, setGroupDescription] = useState(group.groupIntro);
    const [hasModified, setHasModified] = useState(false);

    useEffect(() => {
        setHasModified(groupName !== group.groupName || groupTags !== group.tags || groupDescription !== group.groupIntro);
    }, [groupName, groupTags, groupDescription, group])


    const [error, setError] = useState(readOnly ? "You are not the owner of this group!" : null);

    return <div className="modal fade" id="settingModal" tabIndex="-1" role="dialog"
        aria-labelledby="settingModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="settingModalLabel">Settings</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                    {error && <Error error={error} />}
                    <form className=""
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (readOnly) return;
                            if (groupName === "") {
                                setError("Group name cannot be empty!");
                                return;
                            }
                            let updatedGroup = { ...group };
                            updatedGroup.groupName = groupName;
                            updatedGroup.tags = groupTags;
                            updatedGroup.groupIntro = groupDescription;
                            axios.patch(API_URL + `/group/update/${group._id}`, { ...updatedGroup }).then(
                                () => {
                                    setGroup({ ...updatedGroup });
                                    console.log(group)
                                    window.alert("Group updated successfully!");
                                },
                                (err) => {
                                    console.log(err)
                                    setError(err.response.data.message || "Something went wrong!");
                                }
                            )

                        }}
                    >
                        {hasModified && <div className="w-100 d-flex">
                            <button className="btn btn-danger btn-sm ms-auto" type="button" onClick={
                                () => {
                                    setGroupName(group.groupName);
                                    setGroupTags(group.tags);
                                    setGroupDescription(group.groupIntro);
                                }
                            }>
                                <i className="fa-solid fa-rotate-right me-2"></i>
                                Reset
                            </button>
                        </div>}
                        <div className={"form-group mt-2 " + (group.groupName !== groupName ? "border border-warning rounded p-3" : "")}>
                            <label htmlFor="group-name" className="form-label">Group Name</label>
                            <input type="text" className="form-control" id="group-name" value={groupName} onChange={
                                (e) => {
                                    if (readOnly) return;
                                    setGroupName(e.target.value);
                                }
                            } />
                        </div>
                        <div className={"form-group mt-2 " + (group.tags !== groupTags ? "border border-warning rounded p-3" : "")}>
                            <TagSelection tag={groupTags} setTag={readOnly ? () => { } : setGroupTags} setError={readOnly ? () => { } : setError} />
                        </div>
                        <div className={"form-group mt-2 " + (group.groupIntro !== groupDescription ? "border border-warning rounded p-3" : "")}>
                            <label htmlFor="group-description" className="form-label">Group Description</label>
                            <textarea className="form-control" id="group-description" rows="3" value={groupDescription} readOnly={readOnly}
                                onChange={readOnly ? () => { } : (e) => setGroupDescription(e.target.value)} />
                        </div>


                        <button type="submit" className="w-100 btn btn-primary mt-3">Save changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
}