# Code Review

- **Design**: Is the code well-designed and appropriate for your system? Think of all design principles and patterns that you've studied in this course. You may need to *refactor* the code.

SOLID Design:

We need to display the aggregation relation ship between some classes (model in mongoose).

For example, comments is aggregated in posts. Which means every post should have 0-n comments. And comments should not be able to exist outside of posts. Once we delete a post, all the comments for that post should be deleted.

Post is not very good for extenting to other kind of forum section. For example, in our first design, it is good to have other sections in discussion part, such as interview questions, study suggestion, referal. But our model for post is not an abstact or general model, these sub-sections cannot extend the post class. If we need to add more things in discussion, we might have to copy and paste a lot of identical code of post which is not very ideal for designing.

- **Complexity**: Could the code be made simpler? Would another developer be able to easily understand and use this code when they come across it in the future?

In front-end, in return of a react component, using ?: for the specific changing part, instead of copy the hole return jsx.

- **Tests**: Does the code have correct and well-designed automated tests?

This is one of the future parts of our application.

We test our backend api by using postman, we don’t have an automated test process like java test. We might need to write a specific document for testing when we test the apis and frontend components.

- **Naming**: Did the developer choose clear names for variables, classes, methods, etc.?

Our naming should follow Camel-Case for variables and function names. Need check for the naming style.

Some may not be suitable for the meaning or not readable

Solution: add comments for the variable, let others know what’s the meaning of the variable and function.

- **Comments**: Are the comments clear and useful?

Zhenhe Zhang: lack some comments about the function.

Solution: add specification for functions. For api router, we need to doc how front end deliver http requests. For example, request in body or param. Instead of letting front end programmer read the route file by themselves, it is good to have a clear documents.

- **Style**: Does the code follow good programming practices?

Zhenhe Zhang: The UI used is not the same UI library as others, which causes some bugs like html conflict. (the main UI library is the bootstrap, but this part is using MDB)

Solution: change some conflict context and polish UI.

Frontend query styles varies from different sections. Some places we use fetch and other cases we use axios. They both works for HTTP request between front end and server. For better style, we might need to encapsulate the http request actions for front end.

For UI library, we use Bootstrap and MUI. It is good to use only one of the CSS framework. (Using multiple CSS framework might cause rendering error, we don’t have any conflicts so far).

- **Documentation**: Is there a documentation on how to install and run the application?

we did have some documents to illustrate the installation and run the application in the readme

We have a general README for our project including the stacks we use and the road map.