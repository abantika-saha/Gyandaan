const openReducer = (open=false,action)=>{
    if(action.type==="SET"){
        open=true;
    }else if(action.type==="UNSET"){
        open=false;
    }
    return open;
}

export default openReducer;