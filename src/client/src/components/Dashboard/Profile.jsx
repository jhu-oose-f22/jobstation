import { useState, useEffect, useContext,ChangeEvent } from "react";
// import { isLoggedIn, UserContext } from "../context/User";
// import Banner from "./Utils/Banner";
import React from 'react';
import { TagSelection } from "../Utils/Tag";
import { isLoggedIn, UserContext } from "../../context/User";
import {API_URL} from "../../context/Const";

import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBTextArea,
    MDBInput,
} from 'mdb-react-ui-kit';

export default function Profile({ profile }) {
    const { user, toggleUser} = useContext(UserContext);
    
    // //console.log(profile.tags)
    
    const [varyingState, setVaryingState] = useState('');
    const [varyingModal, setVaryingModal] = useState(false);
    const [varyingUserName, setVaryingUserName] = useState('');
    const [varyingEmail, setVaryingEmail] = useState('');
    const [tag, setTag] = useState([]);
    const [error, setError] = useState('');

    const avatarSrc = `https://ui-avatars.com/api/?name=${user.username}&background=random&bold=true`;
    const handleUpdate = async () => {
        let newUser = user;
        Object.assign(newUser, {username: varyingUserName});
        //console.log('new user');
        //console.log(newUser);
        // newUser.username 
        toggleUser(newUser)
        //console.log(user);
        //const group_n_user = { groupId: group._id, username: user.username };
        const updatedUserInfo = {
            userId: user._id,
            newUsername: varyingUserName,
            email: varyingEmail,
            tags: tag,
        }
        await fetch(`${API_URL}/user/update`, {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedUserInfo),
        }).then((res) => res.json());
         
        

        window.history.go(0);
        // navigate("/group");

    };

    useEffect(() => {
        setTag(profile.tags);
    }, [profile]);

    let tagsOfCurrentUser = profile.tags?.map((tag) => {
        return (
            <div
                className="btn btn-outline-secondary btn-sm mx-1"
                underline="none"
            >
                {tag}
            </div>
        );
    })
    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            
                            <MDBBreadcrumbItem active> Profile</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol lg="4" class="vh-10">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src={avatarSrc}
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid />
                                
                                <div className="d-flex justify-content-center mb-2">
                                    {/* <MDBBtn>Edit</MDBBtn> */}
                                    <button type="button" class="btn btn-outline-primary"
                                        onClick={() => {
                                            setVaryingState('');
                                            setVaryingModal(!varyingModal);
                                            setVaryingUserName(profile.username);
                                            setVaryingEmail(profile.email);
                                        }}
                                    >
                                        Edit Profile
                                    </button>
                                    <MDBModal show={varyingModal} setShow={setVaryingModal} tabIndex='-1'>
                                        <MDBModalDialog>
                                            <MDBModalContent>
                                                <MDBModalHeader>
                                                    <MDBModalTitle>Edit {varyingState}</MDBModalTitle>
                                                    <MDBBtn className='btn-close' color='none' onClick={() => setVaryingModal(!varyingModal)}></MDBBtn>
                                                </MDBModalHeader>
                                                <MDBModalBody>
                                                    <form>
                                                        <div className='mb-3'>
                                                            Username
                                                            {varyingModal && (
                                                                <MDBInput
                                                                    value={varyingUserName}
                                                                    // onChange={onChangeUserName}
                                                                    onChange={e => setVaryingUserName(e.target.value)}
                                                                    labelClass='col-form-label'
                                                                    // label='Username:'
                                                                />
                                                            )}
                                                        </div>
                                                        <div className='mb-3'>
                                                            Email
                                                            {varyingModal && (
                                                                <MDBInput
                                                                    value={varyingEmail}
                                                                    // onChange={onChangeEmail}
                                                                    onChange={e => setVaryingEmail(e.target.value)}
                                                                    labelClass='col-form-label'
                                                                    // label='Email:'
                                                                />
                                                            )}
                                                        </div>
                                                        <div className='mb-3'>
                                                            {varyingModal && (
                                                            <TagSelection tag={tag} setTag={setTag} setError={setError} />
                                                                
                                                            )}
                                                        </div>
                                                    </form>
                                                </MDBModalBody>
                                                <MDBModalFooter>
                                                    <button type="button" class="btn btn-outline-secondary" onClick={() => setVaryingModal(!varyingModal)}>
                                                        Cancel
                                                    </button>
                                                    <button type="button" class="btn btn-outline-success" onClick={() => handleUpdate()}>Save changes </button>
                                                </MDBModalFooter>
                                            </MDBModalContent>
                                        </MDBModalDialog>
                                    </MDBModal>
                                    {/* <MDBBtn outline className="ms-1">Email</MDBBtn> */}
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                        
                    </MDBCol>
                    <MDBCol lg="8" class="vh-10">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{profile.username}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{profile.email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Intersested Area</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        
                                        <strong className="text-muted">
                                            {tagsOfCurrentUser}
                                        </strong>
                                        
                                    </MDBCol>
                                </MDBRow>
                                
                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}

