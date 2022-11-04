import { useState, useEffect, useContext,ChangeEvent } from "react";
// import { isLoggedIn, UserContext } from "../context/User";
// import Banner from "./Utils/Banner";
import React from 'react';
import { TagSelection } from "../Utils/Tag";

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
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
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
    
    // console.log(profile.tags)
    
    const [varyingState, setVaryingState] = useState('');
    const [varyingModal, setVaryingModal] = useState(false);
    const [varyingUserName, setVaryingUserName] = useState('');
    const [varyingEmail, setVaryingEmail] = useState('');
    const [tag, setTag] = useState([]);
    const [error, setError] = useState('');
    const handleUpdate = async () => {
        //const group_n_user = { groupId: group._id, username: user.username };
        const updatedUserInfo = {
            originalUsername: profile.username,
            username: varyingUserName,
            email: varyingEmail,
            tags: tag,
        }
        await fetch(`/user/update/${profile.username}`, {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedUserInfo),
        }).then((res) => console.log(res));

        window.history.go(0);
        // navigate("/group");

    };

    useEffect(() => {
        setTag(profile.tags);
    }, [profile]);

    let tagsOfCurrentUser = profile.tags?.map((tagg) => {
        return (
            <MDBCardText key={tagg} className="text-muted">{tagg}</MDBCardText>
        );
    });
    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <MDBBreadcrumbItem>
                                <a href='#'>Home</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem>
                                <a href="#">User</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid />
                                {/* <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
                                <div className="d-flex justify-content-center mb-2">
                                    {/* <MDBBtn>Edit</MDBBtn> */}
                                    <MDBBtn
                                        onClick={() => {
                                            setVaryingState('oldUsername');
                                            setVaryingModal(!varyingModal);
                                            setVaryingUserName(profile.username);
                                            setVaryingEmail(profile.email);
                                        }}
                                    >
                                        Edit
                                    </MDBBtn>
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
                                                            {varyingModal && (
                                                                <MDBInput
                                                                    value={varyingUserName}
                                                                    // onChange={onChangeUserName}
                                                                    onChange={e => setVaryingUserName(e.target.value)}
                                                                    labelClass='col-form-label'
                                                                    label='Username:'
                                                                />
                                                            )}
                                                        </div>
                                                        <div className='mb-3'>
                                                            {varyingModal && (
                                                                <MDBInput
                                                                    value={varyingEmail}
                                                                    // onChange={onChangeEmail}
                                                                    onChange={e => setVaryingEmail(e.target.value)}
                                                                    labelClass='col-form-label'
                                                                    label='Email:'
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
                                                    <MDBBtn color='secondary' onClick={() => setVaryingModal(!varyingModal)}>
                                                        Close
                                                    </MDBBtn>
                                                    <MDBBtn onClick={() => handleUpdate()}>Save changes </MDBBtn>
                                                </MDBModalFooter>
                                            </MDBModalContent>
                                        </MDBModalDialog>
                                    </MDBModal>
                                    {/* <MDBBtn outline className="ms-1">Email</MDBBtn> */}
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                        
                    </MDBCol>
                    <MDBCol lg="8">
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
                                        <MDBCardText>IntersestedArea</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        {tagsOfCurrentUser}
                                        {/* <MDBCardText className="text-muted">{profile.tags[0]}</MDBCardText>
                    <MDBCardText className="text-muted">{profile.tags[1]}</MDBCardText> */}
                                    </MDBCol>
                                </MDBRow>
                                {/* <hr /> */}
                                {/* <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                  </MDBCol>
                </MDBRow> */}
                            </MDBCardBody>
                        </MDBCard>

                        {/* <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow> */}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}

