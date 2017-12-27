'use strict'



const config={
    api:{
        base:'http://www.guaiguaiyingshi.com/TP5/public/index.php/',

    },

    map:{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        follow: 20,
        timeout: 15000,
        size: 0,
    }

}



module.exports = config