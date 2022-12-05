# Retrospective for iteration 3
## 1. Delivery
- Deployed the application. The server and chat server are deployed using Rendor and the frontend is deployed using Netlify.
- Updated the recommend system with recommendation based on like or comment(backend) actions user did. The bugs in recommendation system has been fixed and a demo database witch contains data for illustration has been updated.
- Implement the comment function in discuss section.
- Updated the like function in discuss section. Now the frontend could indicate whether user has liked posts.
- Optimized the backend so that classes and collections in MongoDB only associate with each other with ObjectID.
- Designed and implemented the dashboard for user to manage Posts they posted and liked,manage their profiles and groups they joined.
- Designed and implemented group manager role in group section so that the manager could kick groupmembers out..
- Added edit funtion in group section, the owner can edit information of group.
## 2. Challenges
- When deploying the application, there were errors in deployment of the frontend in render(probably because there are two servers of this application). So we deploy the two servers on Rendor and the client on Netlify.
- There were conflicts in updated user information in dashboard with other pages. When user information updated on the dashboard, the discuss and goupchat page will crash. 
- Since we use "name" field of our collections to associates colletions and classes, our recommend system needs to be rebuild and redesigned.
- After updated "userId" in server, it is hard to display username in discuss section. So we have to redesign the schema of post and look up username use userId routinely.
## Plans for iteration5
  The main problem of this version is the applicaiton is not robust. We are going to test the functions we have developed and fix bugs.