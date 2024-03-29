<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- TODO, private repo cannot add these -->
<!-- [![Contributors][contributors-shield]][contributors-url] -->
<!-- [![Forks][forks-shield]][forks-url] -->
<!-- [![Stargazers][stars-shield]][stars-url] -->
<!-- [![Issues][issues-shield]][issues-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="img/logo.png" alt="Logo" >
  </a>
  <h1 align="center">Job Station</h3>

  <p align="center">
    An one-stop job prep web for all JHU@CS students!
    <br />
    <!-- TODO Add doc -->
    <!-- <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a> -->
    <br />
    <br />
    <a href="https://github.com/jhu-oose-f22/jobstation/issues">Report Bug</a>
    ·
    <a href="https://github.com/jhu-oose-f22/jobstation/issues">Request Feature</a>
  </p>
</div>

[![MIT License][license-shield]][license-url]


<!-- TABLE OF CONTENTS 
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#deployment">Deployment</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>
-->


<!-- ABOUT THE PROJECT -->
## About The Project



### Built With

* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
<!--* [![JQuery][JQuery.com]][JQuery-url] -->
* [![Express][Express]][Express-url]
* [![MongoDB][MongoDB]][MongoDB-url]




<!-- GETTING STARTED -->
## Getting Started
### URLs of the deployment 
[Frontend:  https://jobstation.netlify.app/](https://jobstation.netlify.app/)  
[Server:  https://it4-back.onrender.com](https://it4-back.onrender.com)  
[Server for group chat: https://it4-chat-frug.onrender.com](https://it4-chat-frug.onrender.com)

### Install prerequisites and run locally  

- Start chat server.   
  - chatserver creates a socket for every chatroom to support live chat, stores new messages to database and retrieves history messages from  database.
```bash
cd src/chatserver
npm i && npm start
```
- client  
  - all frontend pages
```bash
cd src/client
npm i && npm start
```
- start backend  
  - backend for user/post/group CRUD operations
```bash
cd src/server
npm i && npm start
```

- Go to http://localhost:3000/


<!-- ### Deployment -->


<!-- USAGE EXAMPLES -->
## Usage/Functionality Description

So far,
1.  you can CRUD post and group(chatroom)
- Sign up,  sign in, sign out
  - **sign up**: enter valid username, email, and password to sign up
  - **sign in**: sign in using username and password
  - **sign out**: click Sign out and user will be redirect to the sign up / log in page. 
- Create, modify, delete, and search post/group. 
  - **create**: After log in, user can create a new post. 
 on the topright of the page. All three fields(title, tags, body) are required to be posted.
  
  - **modify&delete**: Owner of the post have permission to modify or delete the post, while other users can view/like/comment the post.
  -  **search**: Click the magnifier button on the topright to search post. All three fields of the post(title, tag, body) are supported for search. 

2. group live chat
- View existing groups
- join a group and chat with group members, rich-text supported
- group owner can remove a member if they misbehaves


3. Recommendation System.
- Get Recommended Groups based on tags you like.

<!-- ROADMAP -->
## Roadmap

- [x] Add SRS

- [x] Add Group Chat
  - [x] Backend
    - socket, database interaction
  - [x] Frontend
    - rich-text supported

- [x] Add Job Forum
  - [x] Refactor/Refine/Rewrite CRUD of Iteration 1
  - [x] Rewrite frontend using React
  - [x] Add Recommendation System

<!-- - [ ] Add Job Board
  - [ ] Add CRUD
  - [ ] Add frontend
  - [ ] Add Recommendation System -->
- [ ] Add Job Tracking
- [ ] Add User System

- [ ] More...

See the [open projects](https://github.com/jhu-oose-f22/jobstation/projects) for a full list of proposed features for current iteration.

<!-- CONTRIBUTING -->
## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->
## Contact
If there is question about the code or using the app, please feel free to pull an [issue]([Issues · jhu-oose-f22/jobstation (github.com)](https://github.com/jhu-oose-f22/jobstation/issues)) or contact us through zliang30@jh.edu.

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

The recommendation system is implemented with [Pipeless APIs]([Pipeless | Recommendations and Activity Feeds API](https://pipeless.io/)).

The front-end is implemented with:

- [Metarial UI]([MUI: The React component library you always wanted](https://mui.com/))
- [Bootstrap]([Bootstrap · The most popular HTML, CSS, and JS library in the world. (getbootstrap.com)](https://getbootstrap.com/))

We appreciate all the supports!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Express]: https://img.shields.io/badge/Express-7DB150?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-20232A?style=for-the-badge&logo=mongodb&logoColor=61DAFB
[MongoDB-url]: https://mongodb.com/
