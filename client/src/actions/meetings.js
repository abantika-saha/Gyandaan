
import * as api from '../api/meetings'


export const getMeetings = (volunteerId) => async (dispatch) => {
    try {
        const { data } = await api.getMeetings(volunteerId);
        console.log(data);
        dispatch({ type: "GET_MEETINGS", payload: data });

    } catch (error) {
        console.log(error);
    }
}

export const createMeeting=(meet)=>async(dispatch)=>{

    try{
        const {data}=await api.createMeeting(meet);
        console.log(data);
        dispatch({type:"CREATE",payload:data});
    }catch(error){
        console.log(error);
    }
}