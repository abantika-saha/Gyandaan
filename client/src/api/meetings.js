import axios from 'axios';



export const getMeetings = (volunteerId)=> axios.get(`https://gyandaan-backend.herokuapp.com/booking/getVolunteerBookings?userId=${volunteerId}`);

export const createMeeting=(meet)=>axios.post('https://gyandaan-backend.herokuapp.com/booking/bookSlot',meet);