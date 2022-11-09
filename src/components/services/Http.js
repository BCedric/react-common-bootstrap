import axios from 'axios'

// import TokenManager from "./TokenManager"

// const completeServerURL = `${process.env.API_URL}/api`

const queryStringBuild = (url, params = null) => {
  if (params == null) {
    return `/api${url}`
  }
  return `/api${url}?${Object.keys(params)
    .map((paramKey) => `${paramKey}=${params[paramKey]}`)
    .join('&')}`
}

const setHeaders = () => {
  const headers = {}
  if (window.USER_API_KEY != null) headers['X-AUTH-TOKEN'] = window.USER_API_KEY

  return headers
}

// const checkHttpError = res => {
//     if (!res.ok) {
//         if (res.status === 401 && res.statusText === 'Unauthorized') {
//             TokenManager.removeToken()
//         }
//         throw `${res.status} ${res.statusText}`
//     }
//     return res
// }

const checkError = (res) => {
  if (res != null) {
    if (res['@type'] === 'hydra:Error') {
      throw res['hydra:description']
    }
  }
  return res
}

class Http {
  static get = (
    url,
    params = null,
    onResponseReceived = 'json',
    options = {}
  ) => {
    return axios
      .get(queryStringBuild(url), {
        params,
        headers: setHeaders(),
        ...options
      })
      .then((response) => response.data)
  }

  static post = (url, body, params = null, onProgress = () => {}) => {
    return axios
      .post(queryStringBuild(url), JSON.stringify(body), {
        params,
        headers: setHeaders()
      })
      .then((response) => response.data)
  }

  static delete = (url, params = null) => {
    return axios
      .delete(queryStringBuild(url), {
        headers: setHeaders(),
        params
      })
      .then((response) => response.data)
  }

  static put = (url, body, params = null) => {
    return axios
      .put(queryStringBuild(url), JSON.stringify(body), {
        params,
        headers: {
          'Content-Type': 'application/merge-patch+json',
          ...setHeaders()
        }
      })
      .then((response) => response.data)
  }

  static patch = (url, body, params = null) => {
    return axios
      .patch(queryStringBuild(url), JSON.stringify(body), {
        params,
        headers: {
          'Content-Type': 'application/merge-patch+json',
          ...setHeaders()
        }
      })
      .then((response) => response.data)
  }

  static postFormData = (url, formData, params = null) => {
    return axios
      .post(queryStringBuild(url), formData, {
        params,
        headers: setHeaders()
      })
      .then((response) => response.data)
  }
}

export default Http
