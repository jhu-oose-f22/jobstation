
import Pipeless from "pipeless";

const defaultClient = Pipeless.ApiClient.instance;
// Configure API key authorization: App_API_Key
const App_API_Key = defaultClient.authentications['App_API_Key'];
App_API_Key.apiKey = "Bearer AD3DFmGXck8ZnhQQbtNhrfwb36mXRa64M3incCLa"

const pipeApi = new Pipeless.GeneralApi();
export const recommendApi = new Pipeless.RecommendationsApi();
export const appId = 1702; // {Number} 
// const opts = {};

//create
export const createPostEvent = async (req, res, next) => {
    const {title, tags} = req.body;
    var postEvents = [];
    var eventBatch = [];
    for (const tag of tags){
        eventBatch.push({
            start_object: {id: title, type: 'post'},
            relationship: {type: 'taggedWith'},
            end_object: {id: tag, type: 'tag'}
        });
        
        if (eventBatch.length >= 10){
            postEvents.push(eventBatch);
            eventBatch = [];
        }
    } 
    if(eventBatch) postEvents.push(eventBatch);
    for (const postEvent of postEvents){
        const opts = JSON.stringify({
            events: postEvent,
            synchronous: false
        });
        //console.log(opts);
        pipeApi.createEventsBatch(appId, opts, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                //console.log('API called successfully. Returned data: ' + data);
            }
        });
    }
    
    next();
}

export const createGroupEvent = async (req, res, next) => {
    const {groupName, tags} = req.body;
    var groupEvents = [];
    var eventBatch = [];
    for (const tag of tags){
        eventBatch.push({
            start_object: {id: groupName, type: 'company'},
            relationship: {type: 'taggedWith'},
            end_object: {id: tag, type: 'tag'}
        });
        
        if (eventBatch.length >= 10){
            groupEvents.push(eventBatch);
            eventBatch = [];
        }
    } 
    if(eventBatch) groupEvents.push(eventBatch);
    for (const groupEvent of groupEvents){
        const opts = JSON.stringify({
            events: groupEvent,
            synchronous: false
        });
        //console.log(opts);
        pipeApi.createEventsBatch(appId, opts, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                //console.log('API called successfully. Returned data: ' + data);
            }
        });
    }
    
    next();
}

export const createEventsForFakeUsers = async (user) => {
    const {name, tags} = user;
    var Events = [];
    var eventBatch = [];
    for (const tag of tags){
        eventBatch.push({
            start_object: {id: name, type: 'post'},
            relationship: {type: 'taggedWith'},
            end_object: {id: tag, type: 'tag'}
        });
        eventBatch.push({
            start_object: {id: name, type: 'company'},
            relationship: {type: 'taggedWith'},
            end_object: {id: tag, type: 'tag'}
        });
        if (eventBatch.length >= 10){
            Events.push(eventBatch);
            eventBatch = [];
        }
    } 
    if(eventBatch) Events.push(eventBatch);
    for (const Event of Events){
        const opts = JSON.stringify({
            events: Event,
            synchronous: false
        });
        //console.log(opts);
        pipeApi.createEventsBatch(appId, opts, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                //console.log('API called successfully. Returned data: ' + data);
            }
        });
    }
    return
    
}

export const createEventsForUsers = async (name, tags) => {
    var Events = [];
    var eventBatch = [];
    for (const tag of tags){
        eventBatch.push({
            start_object: {id: name, type: 'post'},
            relationship: {type: 'taggedWith'},
            end_object: {id: tag, type: 'tag'}
        });
        eventBatch.push({
            start_object: {id: name, type: 'company'},
            relationship: {type: 'taggedWith'},
            end_object: {id: tag, type: 'tag'}
        });
        if (eventBatch.length >= 10){
            Events.push(eventBatch);
            eventBatch = [];
        }
    } 
    if(eventBatch) Events.push(eventBatch);
    for (const Event of Events){
        const opts = JSON.stringify({
            events: Event,
            synchronous: false
        });
        //console.log(opts);
        pipeApi.createEventsBatch(appId, opts, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                //console.log('API called successfully. Returned data: ' + data);
            }
        });
    }
    return
}

export const createUsersEvents = async (req, res, next) => {
    const {tags, username} = req.body;
    
    createEventsForUsers(username, tags);

    var userEvents = [];
    var userBatch = [];
    for (const tag of tags){
        userBatch.push({
            start_object: {id: username, type: 'user'},
            relationship: {type: 'taggedWith'},
            end_object: {id: tag, type: 'tag'}
        });
        
        if (userBatch.length >= 10){
            userEvents.push(userBatch);
            userBatch = [];
        }
    } 
    if(userBatch) userEvents.push(userBatch);
    for (const userEvent of userEvents){
        const opts = JSON.stringify({
            events: userEvent,
            synchronous: false
        });
        //console.log(opts);
        pipeApi.createEventsBatch(appId, opts, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                //console.log('API called successfully. Returned data: ' + data);
            }
        });
    }
    const opts = JSON.stringify({
        events: [
            {
                start_object: {id: username, type: 'user'},
                relationship: {type: 'interestedIn'},
                end_object: {id: username, type: 'post'}
            },
            {
                start_object: {id: username, type: 'user'},
                relationship: {type: 'interestedIn'},
                end_object: {id: username, type: 'company'}
            }
        ]
    })
    pipeApi.createEventsBatch(appId, opts, (error, data, response) => {
        if (error) {
            console.error(error);
        } else {
            //console.log('API called successfully. Returned data: ' + data);
        }
    });
    next();
    
}

//recommend
export const getRelatedContentsTitle = async ( userName, ContentsType ) => {
    var opts = JSON.stringify({
        object: {id: userName, type: ContentsType},
        content_tagged_relationship_type: 'taggedWith',
    });
    var RelatedContentsNames = [];
    recommendApi.getRelatedContent(appId, opts, (error, data, response) => {
        if (error) {
            console.error(error);
        } else {
            //console.log('API called successfully. Returned data: ' + data);
            const results = (new Function("return " + response.text))();
            
            for ( var item of results.items ) RelatedContentsNames.push( item.object.id );
        }
    });

    return RelatedContentsNames;
}

export const getRecommendedContentsTitle = async ( userName, ContentsType ) => {
    var opts = JSON.stringify({
        object: {id: userName, type: ContentsType},
        content_tagged_relationship_type: 'taggedWith',
    });
    var RelatedContentsNames = [];
    recommendApi.getRelatedContent(appId, opts, (error, data, response) => {
        if (error) {
            console.error(error);
        } else {
            console.log('API called successfully. Returned data: ' + data);
            const results = (new Function("return " + response.text))();
            
            for ( var item of results.items ) RelatedContentsNames.push( item.object.id );
        }
    });

    return RelatedContentsNames;
}


//For test
export const createFakeUsers = async (req, res) => {
    const {users} = req.body;
    
    for (const user of users){
        createEventsForFakeUsers(user);

        var userEvents = [];
        var userBatch = [];
        for (const tag of user.tags){
            userBatch.push({
                start_object: {id: user.name, type: 'user'},
                relationship: {type: 'taggedWith'},
                end_object: {id: tag, type: 'tag'}
            });
            
            if (userBatch.length >= 10){
                userEvents.push(userBatch);
                userBatch = [];
            }
        } 
        if(userBatch) userEvents.push(userBatch);
        for (const userEvent of userEvents){
            const opts = JSON.stringify({
                events: userEvent,
                synchronous: false
            });
            console.log(opts);
            pipeApi.createEventsBatch(appId, opts, (error, data, response) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('API called successfully. Returned data: ' + data);
                }
            });
        }
        const opts = JSON.stringify({
            events: [
                {
                    start_object: {id: user.name, type: 'user'},
                    relationship: {type: 'interestedIn'},
                    end_object: {id: user.title, type: 'post'}
                },
                {
                    start_object: {id: user.name, type: 'user'},
                    relationship: {type: 'interestedIn'},
                    end_object: {id: user.title, type: 'company'}
                }
            ]
        })
        pipeApi.createEventsBatch(appId, opts, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
            }
        });
    }
    res.status(201).json("added fake users")
    
}