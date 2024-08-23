// api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dev.moydomonline.ru/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default {
  login(credentials) {
    return api.post('/auth/login/', credentials)
  },
  getApplications(token) {
    return api.get('/appeals/v1.0/appeals/', {
      headers: { Authorization: `Token ${token}` },
    })
  },
  createApplication(token, data) {
    return api.post('/appeals/v1.0/appeals/', data, {
      headers: { Authorization: `Token ${token}` },
    })
  },
  updateApplication(token, id, data) {
    return api.patch(`/appeals/v1.0/appeals/${id}/`, data, {
      headers: { Authorization: `Token ${token}` },
    })
  },
  getPremises(token, search) {
    return api.get(`/geo/v2.0/user-premises/?search=${search}`, {
      headers: { Authorization: `Token ${token}` },
    })
  },
  getApartments(token, premise_id, search) {
    return api.get(`/geo/v1.0/apartments/?premise_id=${premise_id}&search=${search}`, {
      headers: { Authorization: `Token ${token}` },
    })
  },
}