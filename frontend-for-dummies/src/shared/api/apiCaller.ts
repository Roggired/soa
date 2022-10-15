import axios, { AxiosResponse } from 'axios'

const BASE_URL_COLLECTION = 'http://localhost:20000/collection/api/v1'
const BASE_URL_DEMOGRAPHY = 'http://localhost:20000/demography/api/v1'

export const apiCaller = async ({
    route,
    method = 'GET',
    data = undefined,
    service = 'COLLECTION',
}: {
    route: string
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE'
    data?: any
    service?: 'COLLECTION' | 'DEMOGRAPHY'
}): Promise<AxiosResponse> => {
    const headers = {
        'Content-Type': 'application/xml',
        Accept: 'application/xml',
    }

    const baseUrl =
        service == 'COLLECTION' ? BASE_URL_COLLECTION : BASE_URL_DEMOGRAPHY

    return axios({
        method,
        url: `${baseUrl}${route}`,
        data: data ? data : null,
        headers,
    })
}
