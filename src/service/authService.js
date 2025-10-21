import axios from 'axios';

// Use seu IP local para desenvolvimento mobile
const API_URL = 'http://localhost:3000/auth/login';

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL, { 
      email, 
      password 
    });
    
    // Salvar token se necessário
    if (response.data.token) {
      // await AsyncStorage.setItem('userToken', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 
                   error.response?.data?.error || 
                   'Erro de conexão com o servidor';
    throw new Error(message);
  }
};