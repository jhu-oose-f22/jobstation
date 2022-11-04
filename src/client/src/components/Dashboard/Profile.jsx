// import { useState, useEffect, useContext } from "react";
// // import { isLoggedIn, UserContext } from "../context/User";
// // import Banner from "./Utils/Banner";

// export default function Dashboard({ profile }) {
//     // const {user} = useContext(UserContext);

//     return (
//         <h2 className="">{profile.username}</h2>
//     // <div>{profile.username}</div>
//     );
// }

import React from 'react';
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
  MDBListGroupItem
} from 'mdb-react-ui-kit';

export default function Profile({profile}) {
    // console.log(profile)
    // profile.tags = profile.tags.map((tag) => {
    //     return (
    //         <li key={tag}>
    //         <MDBCol sm="9">
    //                 <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
    //               </MDBCol></li>
    //         // <li className=" list-group-item border-0 " key={group._id}>
    //         //     <GroupCard group={group} joined={true} listname={listName} />
    //         // </li>
    //     );
    // });

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-4"> </p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Edit</MDBBtn>
                  {/* <MDBBtn outline className="ms-1">Message</MDBBtn> */}
                </div>
              </MDBCardBody>
            </MDBCard>

            
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Username</MDBCardText>
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
                    <MDBCardText>Interested Area</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profile.tags}</MDBCardText>
                  </MDBCol>
                  
                </MDBRow>
                {/* <hr /> */}
                
                
              </MDBCardBody>
            </MDBCard>

            
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
