import utils from "./utils";
import { UserModule } from '@/store/modules/user';

let host = process.env.VUE_APP_BASE_API;

const TenantId = 2;

const getRequest = utils.httpsPromisify(uni.request);

const request = (
    method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT',
    url: string,
    data: string | object | ArrayBuffer) => {

    uni.showLoading();
    uni.showNavigationBarLoading();

    let _url = (url.startsWith("http") ? url : host + url);

    // method为请求方法，url为接口路径，data为传参
    return getRequest({
        url: _url,
        data: data,
        method: method,
        header: {
            "content-type": "application/json",
            "Authorization": `Bearer ${UserModule.getToken || ''}`,
            "Abp.TenantId": `${TenantId}`,
        }
    });
};


export default {
    init: (data: any) => request('GET', `https://www.lovewujiang.com/Wx/getShopInit?appId=wx1dfe7106c7a40821`, data),
    userInit: (data: any) => request('GET', `http://localhost:8088/Wx/UserInit`, data),
    project_Get: (data: { id: number }) => request('GET', `http://localhost:21020/api/products/GetProduct`, data),
    project_GetAll: (data: any) => request('GET', `http://localhost:21020/api/products/GetAll`, data),
    postUserInfo: (data: any) => request('POST', `http://localhost:8088/api/WoJu/postUserInfo2`, data),
    pay: (data: any) => request('POST', `http://localhost:8088/Api/V1/SomePostWithToken`, data),

};