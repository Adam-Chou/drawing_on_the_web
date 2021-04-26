 //calls api


//featured apis.
// https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/

/*

https://ipinfo.io/developers/responses#free-plan - grabs ip, not free. 


https://api.coindesk.com/v1/bpi/currentprice.json - price of bitcoin

https://api.coingecko.com/api/v3/exchange_rates - crypto exchange rates

http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json - weather forecasts

https://ipinfo.io/161.185.160.93/geo - current geographic location

*/
  /*
let apiCall = async () => {
    let api_key = 'PcFfKRsMeKsxQMcxpqT8';
    const url = `https://www.quandl.com/api/v3/datasets/MULTPL/SP500_EARNINGS_YIELD_MONTH.json?api_key=${api_key}`; //grabs the key from my php
    const response = await fetch(url);
    if (response.ok){
        await response.json().then(editor); // then will run editor function after promise resolves, gotta love learning new things!
    }else{
        console.log("Cannot access file");
    }
};

//prepares data for animation
let editor = (file) => {
    var NumData = []; //array with a bunch of coords in it for graph simulation
    const data = file.dataset.data;
    for (let i = 0; i<data.length; i++){
        NumData.push(data[i][1]);
    }
}

*/

let text = document.querySelector("div");


let apiCall = async () => {
    const url = `https://randomuser.me/api`; 
    const response = await fetch(url);
    if (response.ok){
        await response.json().then((data)=> text.innerHTML = JSON.stringify(data)); // then will run editor function after promise resolves, gotta love learning new things!
    }else{
        console.log("Cannot access file");
    }
};

apiCall();
