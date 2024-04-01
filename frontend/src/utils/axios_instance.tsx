import Axios, {
  CancelTokenSource,
  AxiosStatic,
  AxiosInstance,
  AxiosRequestConfig
} from 'axios'
import { apiEndpoint } from './variables'
import get from 'lodash/get'

export interface AxiosRequestConfigWithExtra extends AxiosRequestConfig {
  extra?: {
    retriesLeft: number
    isRetrying: boolean
  }
}

export interface IHttpInstance {
  source: CancelTokenSource
  http: AxiosInstance
  externalHttp: AxiosStatic
  cancel: () => void
}

export const BASIC_CONFIG = {
  baseURL: '',
  url: ''
}

class HttpService implements IHttpInstance {
  private endPoint: string
  private host: string

  source: CancelTokenSource
  http: AxiosInstance
  externalHttp: AxiosStatic

  constructor(
    endPoint: string
  ) {
    this.endPoint = endPoint
    this.host = apiEndpoint
    const { source, http } = this.initAxios()
    this.source = source
    this.http = http
    this.externalHttp = Axios
  }

  private initAxios() {
    const source: CancelTokenSource = Axios.CancelToken.source()
    const baseURL = `${this.host}/${this.endPoint}`
    const http = Axios.create({
      baseURL,
      cancelToken: source.token,
      withCredentials: true
    })

    http.interceptors.response.use(null, this.refreshToken)

    return { source, http }
  }

  refreshToken = (error: Error) => {
    const errorMessage = get(error, 'response.data.error.message', '')
    if (errorMessage.includes('jwt expired')) {
      Axios.post(
        `${this.host}/auth/refreshtoken`,
        {},
        {
          withCredentials: true
        }
      ).then((response) => {
      console.log("🚀 ~ HttpService ~ ).then ~ response:", response)
      })
    }
  }

  cancel(): void {
    if (this.source !== undefined) {
      this.source.cancel(`${this.endPoint} operation canceled by the user`)
      const { source, http } = this.initAxios()
      this.source = source
      this.http = http
    }
  }
}

export default HttpService
