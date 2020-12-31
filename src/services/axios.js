import axios from 'axios'

const axiosInstance = axios.create({
  /** bu kodlar deyisilir cunki logout edib, login edende login page-e kecmek yerine, avtomatik userin hesaba daxil olurdu
    cunki, localstorgeden meetuper-jwt silinse de, token qalirdi.
    * ancaq, logout edib, refresh edib, login edende bele olmur cunki refresh edende variableslar da refresh olur
   */
  //if request taking more than 3seconds, then request considered as a failed request and you'll get err from server
  // timeout: 3000,

  /** bu line silinmese localstorage restart olsa bele, her defe token headere gonderilir.
   ona gore de logout edib login edende yeniden hesabsa girir
  */
  // //getting token 
  // headers: { 'authorization': `Bearer ${(localStorage.getItem('meetuper-jwt') || '')}` }
  timeout: 3000
})

//before req inside of function will be runned and we'll set token to authorization header
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('meetuper-jwt') || ''

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, function (err) {
  return Promise.reject(err)
})

export default axiosInstance