import fetch from "cross-fetch";
import Cookies from "js-cookie";
import $ from "jquery";

let webApi = `/`

export const setWebApi = config=> webApi = config.webApi[location.host]



export const api = (endpoint, ...args) => async (dispatch) => {
    let response = await fetch(`//${webApi}/${endpoint}`, ...args)
    if (response.status === 403) {
        location.href = `//${webApi}/login/cas?return_uri=${encodeURIComponent(location.href)}`
        return response
    }
    return response
}

export const cors = (method = 'GET') => ({
    headers: {"X-XSRF-TOKEN": Cookies.get('XSRF-TOKEN')},
    credentials: 'include',
    method
})

export const json = (body, opt) => $.extend(true, {}, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
}, opt)

export const text = (body, opt) => $.extend(true, {}, {
    method: 'POST',
    headers: {"Content-Type": "html/text"},
    body,
}, opt)
