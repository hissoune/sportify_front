import axiosInstance from '../client/axiosInstance';

const AuthService = {



    login: async (email, password) => {
        try {
          const response = await axiosInstance.post('/auth/login', { email, password });
          return response.data; 
        } catch (error) {
          console.error('Login failed:', error);
          throw error; 
        }
      },
    
}

export default AuthService;