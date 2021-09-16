
import {GET_DASHBOARD_PAGE, SET_DASHBOARD_PAGE} from './types';

export const getDashboardPage = () => {
    let page=""
    return{
        type : GET_DASHBOARD_PAGE,
        payload:page
    }
}

export const setDashboardPage = (selectedPage) => {
    return{
        type : SET_DASHBOARD_PAGE,
        payload:selectedPage

    }
}

