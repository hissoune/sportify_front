import axiosInstance from '../client/axiosInstance';


const EventsService ={

getAllEvents:async () =>{
    try {
        const response = await axiosInstance.get('/events');
       
        
        return response.data; 
      } catch (error) {
        console.error('Login failed:', error);
        throw error; 
      }
},

createEvent:async (formdata)=>{
    try {
        const response = await axiosInstance.post('/events',formdata);
       
        
        return response.data; 
      } catch (error) {
        console.error('create event  failed:', error);
        throw error; 
      }
},
updateEvent:async (id,formdata)=>{
    try {
        const response = await axiosInstance.patch(`/events/${id}`,formdata);
       
        
        return response.data; 
      } catch (error) {
        console.error('updating events failed:', error);
        throw error; 
      }
},
delteEvent:async (id)=>{
    try {
        const response = await axiosInstance.delete(`/events/${id}`);
       
        
        return response.data; 
      } catch (error) {
        console.error('deleting  events failed:', error);
        throw error; 
      }
}

}
export default EventsService;