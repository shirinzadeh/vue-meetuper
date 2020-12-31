import axios from 'axios'

const axiosInstance = axios.create({
  //if request taking more than 3seconds, then request considered as a failed request and you'll get err from server
  timeout: 3000,
  //getting token 
  headers: { 'authorization': `Bearer ${(localStorage.getItem('meetuper-jwt') || '')}` }
})

export default axiosInstance