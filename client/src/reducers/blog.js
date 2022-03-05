const blogsReducer = (blogs=[],action)=>{
    switch(action.type){
        case "GET":
            return action.payload;
        case "CREATE":
            return [...blogs,action.payload];
        case "LIKE":
            return blogs;
        case "DELETE":
            return blogs.filter((blog)=> blog._id!==action.payload);
        case "UPDATE":
            return blogs;
        default:
            return blogs;
    }
}

export default blogsReducer;