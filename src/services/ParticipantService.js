import axiosInstance from '../client/axiosInstance';


const ParticipantService = {

getAllParticipants:async ()=>{
    try {
        const response = await axiosInstance.get('/users');
       
        
        return response.data; 
      } catch (error) {
        console.error('Login failed:', error);
        throw error; 
      }
}


}

export default ParticipantService;