import axios, {AxiosHeaders, AxiosResponse} from "axios";


export class APIService {
    private baseURL : string = 'http://localhost:3000';
    private authHeaders: AxiosHeaders = new AxiosHeaders();


    public setAuthHeaders(token: string | null) : void{
        this.authHeaders.set('Authorization', `Bearer ${token}`);
    }

    public post<T>(url:string, requestBody?:unknown) : Promise<AxiosResponse<T>> {
        return axios.post<T>(`${this.baseURL}${url}`, requestBody, {headers: this.authHeaders});
    }

    public get<T>(url:string, requestBody?:unknown) : Promise<AxiosResponse<T>> {
        return axios.get<T>(`${this.baseURL}${url}`, {
            params: requestBody, 
            headers: this.authHeaders
        });
    }

    public put<T>(url:string, requestBody?:unknown) : Promise<AxiosResponse<T>> {
        return axios.put<T>(`${this.baseURL}${url}`, requestBody, {headers: this.authHeaders});
    }

    public delete<T>(url:string, requestBody?:unknown) : Promise<AxiosResponse<T>> {
        return axios.delete<T>(`${this.baseURL}${url}`, {
            headers: this.authHeaders,
            data: requestBody
        });
    }

}