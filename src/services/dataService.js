import axios from 'axios';
import { url } from './config';

async function search({query, filters}) {
    let params = new URLSearchParams();
    params.append('query', query);

    for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
            const value = filters[key];
            
            if (typeof value === 'object') {
                params.append(key, JSON.stringify(value));
            } else {
                params.append(key, value);
            }
        }
    }

    let response = await axios.get(url + "/search", {
        params: params,
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    });
    
    return response.data;
}

async function searchInvestor({query, filters}) {
    let params = new URLSearchParams();
    params.append('query', query);

    for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
            const value = filters[key];
            
            if (typeof value === 'object') {
                params.append(key, JSON.stringify(value));
            } else {
                params.append(key, value);
            }
        }
    }

    let response = await axios.get(url + "/search_investor", {
        params: params,
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    });
    
    return response.data;
}

async function searchDeal({query, filters}) {
    let params = new URLSearchParams();
    params.append('query', query);

    for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
            const value = filters[key];
            
            if (typeof value === 'object') {
                params.append(key, JSON.stringify(value));
            } else {
                params.append(key, value);
            }
        }
    }

    let response = await axios.get(url + "/search_deal", {
        params: params,
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    });
    
    return response.data;
}


async function searchCompanyName({query}) {
    let response = await axios.get(url + "/search_company_name", {
        params: { query: query },
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    });
    return response.data;
}

async function searchInvestorName({query}) {
    let response = await axios.get(url + "/search_investor_name", {
        params: { query: query },
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    });
    return response.data;
}

async function searchCityName({query}) {
    let response = await axios.get(url + "/search_city", {
        params: { query: query },
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    });
    return response.data;
}

const searchService={
    search: search,
    searchCompanyName:searchCompanyName,
    searchCityName:searchCityName,
    searchInvestorName:searchInvestorName,
    searchInvestor:searchInvestor,
    searchDeal:searchDeal
};

export default searchService;