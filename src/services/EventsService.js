import axiosInstance from '../client/axiosInstance';


const EventsService ={

getAllEvents:async () =>{
    try {
        const response = await axiosInstance.get('/events');
       ;
        
        return response.data; 
      } catch (error) {
        console.error('Login failed:', error);
        throw error; 
      }
}

}
export default EventsService;