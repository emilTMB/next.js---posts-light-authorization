import axios from 'axios'
import { isAuthenticated, user } from '../store/auth'

interface User {
  id: number;
  username: string;
}

export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await axios.get<User[]>('http://localhost:3001/users', {
      params: {
        username,
        password,
      },
    })

    if (response.data.length) {
      isAuthenticated.set(true)
      user.set(response.data[0])
      return true
    }

    return false
  } catch (error) {
    console.error(error)
    return false
  }
}