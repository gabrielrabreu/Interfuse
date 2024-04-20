import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

class ServiceBase {
  protected api: AxiosInstance;

  constructor(baseURL: string | undefined) {
    this.api = axios.create({
      baseURL: baseURL,
    });

    this.setupInterceptors();
  }

  private async addTokenToHeaders(config: InternalAxiosRequestConfig) {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error setting token:", error);
    }
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(
      async (config) => {
        await this.addTokenToHeaders(config);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 401) {
            throw new Error("Unauthorized");
          } else if (status === 403) {
            throw new Error("Forbidden");
          } else {
            throw new Error(error.response.data.detail || error.message);
          }
        } else {
          throw new Error(error.message);
        }
      }
    );
  }

  public async post<TIn, TOut>(
    url: string,
    data?: TIn,
    config?: AxiosRequestConfig
  ): Promise<TOut> {
    const response: AxiosResponse<TOut> = await this.api.post<TOut>(
      url,
      data,
      config
    );
    return response.data;
  }

  public async put<TIn, TOut>(
    url: string,
    data?: TIn,
    config?: AxiosRequestConfig
  ): Promise<TOut> {
    const response: AxiosResponse<TOut> = await this.api.put<TOut>(
      url,
      data,
      config
    );
    return response.data;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get<T>(url, config);
    return response.data;
  }

  public async delete(url: string, config?: AxiosRequestConfig): Promise<void> {
    await this.api.delete(url, config);
  }
}

export default ServiceBase;
