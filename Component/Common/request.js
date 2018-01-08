'use strict'


import config from './config';
import queryString from 'query-string';
import _ from 'lodash';


let request={}


request.get = (url,params) =>{

    if(params){
        url += '?' + queryString.stringify(params)
    }

    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        follow: 20,
        timeout: 10000,
        size: 0,
    }).
        then((response)=> response.json())

}


request.post = (url,body) =>{

    let map = _.extend(config.map,{
        body:JSON.stringify(body)
    })




    return fetch(url,map)
        .then((response)=> response.json())


}



module.exports = request