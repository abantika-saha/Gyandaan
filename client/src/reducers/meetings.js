const meetingsReducer = (meetings=[],action)=>{
    switch(action.type){
        case "GET_MEETINGS":
            return action.payload;
        case "CREATE_MEETING":
            return [...meetings,action.payload];
        
        default:
            return meetings;
    }
    
}

export default meetingsReducer;