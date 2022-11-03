export default (posts = [],action) =>{
    switch (action.type){
        case 'FETCH_ALL':
            return action.payload;
<<<<<<< HEAD
=======
        case 'FETCH_ONE':
            return action.payload;
>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f
        case 'CREATE':
            return posts;
        default:
            return posts;
    }
}

