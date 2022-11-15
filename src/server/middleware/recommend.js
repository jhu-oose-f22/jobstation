
import Pipeless from "pipeless";

const defaultClient = Pipeless.ApiClient.instance;
// Configure API key authorization: App_API_Key
const App_API_Key = defaultClient.authentications['App_API_Key'];
App_API_Key.apiKey = "Bearer AD3DFmGXck8ZnhQQbtNhrfwb36mXRa64M3incCLa"

const pipeApi = new Pipeless.GeneralApi();
export const recommendApi = new Pipeless.RecommendationsApi();
export const appId = 1702; // {Number} 
// const opts = {};

/*
group -- company
creator, owner -- posted

*/


//create event
export const createPostEvent = async (id, tags, creator) => {
    // const {title, tags} = req.body;
    var postEvents = [];
    var eventBatch = [];
    for (const tag of tags){
        eventBatch.push({
            start_object: {id: id, type: 'post'},
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
                console.log("error");
                console.log(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
            }
        });
    }

    const creatorOpts = JSON.stringify({
        event: {
            start_object: {id: creator, type: 'user'},
            relationship: {type: 'posted'},
            end_object: {id: id, type: 'post'}
        }
    });
    pipeApi.createEvent(appId, creatorOpts, (error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          console.log('posted post API called successfully. Returned data: ' + data);
        }
    });
    
}

export const createGroupEvent = async (id, tags, creator) => {

    var groupEvents = [];
    var eventBatch = [];
    for (const tag of tags){
        eventBatch.push({
            start_object: {id: id, type: 'company'},
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
                console.log('API called successfully. Returned data: ' + data);
            }
        });
    }

    const creatorOpts = JSON.stringify({
        event: {
            start_object: {id: creator, type: 'user'},
            relationship: {type: 'posted'},
            end_object: {id: id, type: 'company'}
        }
    });
    pipeApi.createEvent(appId, creatorOpts, (error, data, response) => {
        if (error) {
          console.error(error);
        } else {
          console.log('created group API called successfully. Returned data: ' + data);
        }
    });
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
        console.log(opts);
        pipeApi.createEventsBatch(appId, opts, (error, data, response) => {
            if (error) {
                console.log(error)
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
            }
        });
    }
    return
}

export const createUsersEvents = async (userId, tags) => {
    
    createEventsForUsers(userId, tags);
    console.log("userId, tags");
    console.log(userId, tags);

    var userEvents = [];
    var userBatch = [];
    for (const tag of tags){
        userBatch.push({
            start_object: {id: userId, type: 'user'},
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
                start_object: {id: userId, type: 'user'},
                relationship: {type: 'interestedIn'},
                end_object: {id: userId, type: 'post'}
            },
            {
                start_object: {id: userId, type: 'user'},
                relationship: {type: 'interestedIn'},
                end_object: {id: userId, type: 'company'}
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
    
}

//recommend
export const getRelatedContentsTitle = async ( userId, ContentsType ) => {
    var opts = JSON.stringify({
        object: {id: userId, type: ContentsType},
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

export const getRecommendedContentsTitle = async ( userId, ContentsType ) => {
    var opts = JSON.stringify({
        object: {id: userId, type: ContentsType},
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