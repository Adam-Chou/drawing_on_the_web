
//API caller
let apiCall = async (url) => {
    const response = await fetch(url);
    if (response.ok){
        return await response.json().then((data) => {return JSON.stringify(data)}); // then will run editor function after promise resolves, gotta love learning new things!
        
    }else{
        console.log("Cannot access file");
    }
}

let stockCall = async () => {
    //prepares data
    let editor = (file) => {
        var NumData = []; //array with a bunch of coords in it for graph simulation
        const data = file.dataset.data;
        console.log(data)
        for (let i = 0; i<data.length; i++){
            NumData.push(data[i][1]);
        }
        return NumData;
    }
    let api_key = 'PcFfKRsMeKsxQMcxpqT8';
    const url = `https://www.quandl.com/api/v3/datasets/MULTPL/SP500_EARNINGS_YIELD_MONTH.json?api_key=${api_key}`; //grabs the key from my php
    const response = await fetch(url);
    if (response.ok){
        let data = await response.json().then(editor); // then will run editor function after promise resolves, gotta love learning new things!
        return data;
    }else{
        console.log("Cannot access file");
    }
};