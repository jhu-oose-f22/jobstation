# Software Requirement Specification



### Problem Statement:

There are a couple of popular applications for job applicants seeking jobs such as LinkedIn and handshake. But, all of them are focusing on interactions between applicants and companies, like position posting, applying for jobs, and social networks shared by job seekers and headhunters.

Thus, applicants still need a platform to trustingly share information with other applicants including comments about working experiences in certain companies, tips for preparing for interviews, and so on.

Meanwhile, if applicants want to create a live-time group chat with other applications, or they want to share some documents and code blocks, they need to use other platforms like Discord or Slack which is not very convenient.


### Potential Clients:

JHU students majoring in Computer Science and CS-related fields who are looking for internships or full-time jobs, and they want to share the related information or find to communicate with the same situation students.




### Proposed Solution:


Jobstation is a one-stop platform, especially for job applicants at the JHU CS community. In particular, Jobstation can be divided into three parts:

The core part of Jobstation is to provide numerous groups for users to get connected with employees (other students), prepare for interviews together, etc. Each group is a channel for users to chat in real-time. This is somewhat like Slack or Discord, but we may focus on job preparation and add some specialized features. For example, the user can send the code block with syntax highlighting. Users can create their own groups or join existing groups. The website can recommend groups for users based on some recommendation strategies. Inside the group, users can share whatever they want to share, ask whatever they wonder, and they can choose to be anonymous. Unlike the discussion part below, this part focuses on real-time chats with a small number of group members.

The second feature of Jobstation is an anonymous forum. Users can share useful information, like interview experience, application timelines, comparing offers and working experience in certain companies. And potential useful content will be recommended to users based on their user profile.
The forum will have 4 sections: (last three parts are nice-to-have feature, we can implement these functionalities if we go deeper and wider)
General discussion. Users can post information about anything with job searching. There will be tags with each posts, users can use tags to find interesting topics or attract other users who have similar interests.
Interview experience. This part is for users to sharing and finding interview experience of the position they are interested in or apply for. Users could post interview experience like timeline, coding questions, and behavior questions. And they can also look up these posts by choosing companies of interviews or search for it.
Refer. Aluminas or students can release reference posts indicating what position they are willing to reference applicants to and what are their requirements for applicants. Students can look up information in this section and find those willing to reference them.
Compare your offers. When students hold multiple offers and hard to decide which one Users can release posts about their offers in this section. And other user could vote in their posts and leave comments.

The third part is a job board that helps students organize their job application process. This part is like Notion or other note apps. Students can update their job application status from external resources. The website can provide calendars and reminders about interviews based on the schedule provided by users. Once a user updates a schedule, our website will also invite this user to join the specific group for preparation together with others. For example, if a user receives an update about an online assessment for a position after he/she updates this status on the website, the user will be invited to join the group to prepare for this OA together with other users who get the same updates.




### Functional Requirements:

#### Must Have:

##### Forum
As a job applicant, I can view, post general discussion about experience, feedback about job application so that I can get interaction with other applicants.

As a job applicant, I can like the post and leave comments so that I can get interaction with other applicants.

As a job applicant, I want to have selected posts recommended to me based on my interests so that I don’t have to spend time with posts that’s of less use to me.



##### Groups
As a job applicant, I can create, search, join a group, so that I can meet members with the similar background and career goals.

As a job applicant, I want to receive recommendation about the groups that I might be interested, so that I can get more information in the groups.
As a dev, I can recommend specific groups for users based on their user portrait and recommendation algorithm, so that the user can be sticked to our apps.

As a job applicant, I can communicate with the same career-goal applicants, so that we can prepare for the interview together and share study methods.




#### Nice to Have:

##### Forum part

As a job applicant, I can find the referral in the web, so that I can get the interview with less efforts.

As a job applicant, I can share my interview experience with other users.

As a job applicant, I can search for interview experience with specific company that I would apply.
As an alumina, I can post my referral code on the website for job applicants to use.

##### Group part

As a group member, I can use rich text editor to send messages, so that I can send code blocks with syntax highlighting and send images.

As a group member, I want to have a calendar to manage group's schedule, so that I can know when the group will have OA / interviews.

As a group owner, I can kick out members who are not active in the group, so that I can keep the group clean and active.

As a group owner, I can transfer the ownership of the group to other members, so that I can keep the group active.

### Non-functional Requirements:

Multiple login method such as Google, Github and LinkedIn.

Friendly user interface and smooth user interaction design.

Security for live-time chat.

### Software Architecture & Technology Stack:

It is a web based application.
Architecture: Client-Server
And we will mainly use MERN stack.

Backend: Nodejs, Express. Pipeless(for recommend system)

Frontend framework: React.js Bootstrap 

Database: MongoDB

Deployment: AWS



### Similar Apps:

Handshake, LinkedIn, Indeed, Untapped, Leetcode.
