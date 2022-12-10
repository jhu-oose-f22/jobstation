# Final Retrospective

### **Delivery**

Features delivered: 

1. Must Haves:
    
    We have developed all must-haves we plan to do. In detail, we have made the forum part, where users can make posts and comments. We also have made the group part, where users can join groups they like and chat with each other in real time.
    
    To make it beyond CRUD, we have introduced a recommendation system for both parts based on tags each post or group owns, which works quite well.
    
2. Nice to Haves: 
    
    In addition to must to haves, a few features are also developed. We implemented a User authorization system and a sign up/in page. To make the group chat page more creative, we embed a rich text editor to highlight code syntax and send image, and a calendar page for group members to track the group’s events. And a dashboard page is included to let user track their status. 
    
3. Non-functional:
    
    We provide a friendly user interface and smooth user interaction design. Responsive page and User experience are always the core of our website’s design.
    

Features not delivered:

Some nice-to-have user stories, mentioned in our iteration1 SRS, are not delivered. For instance, we did not have third-party login or an application list(notion likely part). And we also did not accomplish some of the non-functional requirements, such as “use Nginx for flow control” or “live-chat security”. 

### Challenges

1. The recommendation System needs a different Database, so every interaction with DB involving the recommending feature has to be doubled 
2. To make the group chat page get updated in real-time, we need to introduce WebSocket. However, every session should only have one socket and details need to be concerned when refreshing pages or leaving the session.

### How you would do it again if you could go back in time and start at iteration1

1. write tests for every feature.
2. consult with the team to have a uniform tech stack used.
3. design APIs first and implement after.
