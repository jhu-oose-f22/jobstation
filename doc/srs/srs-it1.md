# Software Requirement Specification



### Problem Statement:

There are a couple different platform and ways to find jobs for university students. For example, there are famous websites such as LinkedIn and handshake which are comprehensive platform for job searching and employer/employee interaction. And each companies has their own hiring page for university students to start the application process.

Since we might submit our application in multiple platform and multiple ways, it is good to have a comprehensive website as an organizer to organize all of our job application.



### Potential Clients:

All university students who are looking for internship or full time jobs.  All university students who just want to look up general information about hiring process and companies.



### Proposed Solution:

Our application is a web based platform that help students organize all their job application process. Students can add their job application status from external resource. Our website can generate automatically calendar and reminder about interview based on the schedule provided by users.

Beyond the organizer, our website provides an anonymous forum categorized on popular companies name and job position. All students can ask questions and share experience about their job hunting season. For HR, Headhunting, or whoever are already in some companies, they can post news, new position, referral opportunities.



### Functional Requirements:

#### Must Have:

Job application organizer. Allow users to CRUD entries for each job application. Create interview calendar according to the input.

Forum server for users to post all the stuff about jobs. Provide hashtag for categorize and searching.



#### Nice to Have:

Based on machine learning algorithm to create characteristic forum recommendation.

Client to client chatting. 



### **Non-functional Requirements:**

Friendly user interface and smooth user interaction design. Use ngnix to control load flow.

Third-platform registration, such as Google or Facebook.



### Software Architecture & Technology Stack:

It is a web based application.

Backend: Java or Python or Nodejs.

Frontend framework: Vue.js + React.js + Redux.js

Database: MongoDB + Redis 

Deployment: AWS + Docker



### Similar Apps:

Handshake, LinkedIn, Indeed.