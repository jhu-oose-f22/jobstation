const Pipeless = require('pipeless');

const defaultClient = Pipeless.ApiClient.instance;
// Configure API key authorization: App_API_Key
const App_API_Key = defaultClient.authentications['App_API_Key'];
App_API_Key.apiKey = "Bearer MNDNbrAo4GWzuYkJvDx8qcpDxsXUtn4heGd6WGrS"

const pipeApi = new Pipeless.ActivityApi()
const appId = 123; // {Number} 
// const opts = {};
const callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};

export const createPost = async (req, res) => {
    const {title, message, creator, tags} = req.body;
    const newPost = await Post.createPost({title, message, creator, tags});
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(204).json({ message: error.message});
    }
}
