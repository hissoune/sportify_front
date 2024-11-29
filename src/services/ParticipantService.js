import axiosInstance from '../client/axiosInstance';


const ParticipantService = {

getAllParticipants:async ()=>{
    try {
        const response = await axiosInstance.get('/users');
       
        
        return response.data; 
      } catch (error) {
        console.error('getting users  failed:', error);
        throw error; 
      }
},
createParticipant:async (formData)=>{
    
    try {
        const response = await axiosInstance.post('/users',formData);
       
        
        return response.data; 
      } catch (error) {
        console.error('creating user failed:', error);
        throw error; 
      }
}


}

export default ParticipantService;