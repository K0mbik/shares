const apiKey = "S2y7BgST9MlbkS1aQC2ReYGbMnukRHxT";
const apiUrl = `https://financialmodelingprep.com/api/v3/income-statement/`;
const apiKey1 = "TD36NGVPQQ18K0AM";
const apiUrl1 = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=`;
const apiKey2 = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=`+apiKey1;

const searchButton = document.querySelector(".search-box2 button");
const searchInput = document.querySelector(".search-box2 input");
const finance = document.querySelector(".finance");
const error = document.querySelector(".error");



function formatBillion(number) {
    let formattedNumber = (number / 1000000000).toFixed(6);
    formattedNumber = formattedNumber.replace(/\.?0+$/, '');
    return formattedNumber + " B";

}




async function Calculation(ticker){
    const response = await fetch(apiUrl + ticker + `?period=annual&apikey=${apiKey}`);
    const data = await response.json();
    console.log(data, "data");

    const response1 = await fetch(apiUrl1 + ticker + `&apikey=${apiKey1}`);
    const data1 = await response1.json();
    console.log(data1, "data");

    document.querySelector(".EPS label").innerHTML = data1.EPS || "?";
    document.querySelector(".PE label").innerHTML = data1.PERatio || "?";
    document.querySelector(".PS label").innerHTML = data1.PriceToSalesRatioTTM || "?";
    document.querySelector(".PB label").innerHTML = data1.PriceToBookRatio || "?";
    document.querySelector(".ROE label").innerHTML = (data1.ReturnOnEquityTTM *100).toFixed(1) +"%" || "?";
    document.querySelector(".PEG label").innerHTML = data1.PEGRatio || "?";
    
    

    
    
    document.querySelector(".year2019 label").innerHTML = "$" +formatBillion(data['4'].revenue);
    document.querySelector(".year2020 label").innerHTML = "$" +formatBillion(data['3'].revenue);
    document.querySelector(".year2021 label").innerHTML = "$" +formatBillion(data['2'].revenue);
    document.querySelector(".year2022 label").innerHTML = "$" +formatBillion(data['1'].revenue);
    document.querySelector(".year2023 label").innerHTML = "$" +formatBillion(data['0'].revenue);
    document.querySelector(".temp_rev label").innerHTML = ((Math.pow((data['0'].revenue)/(data['4'].revenue),1/5)-1)*100).toFixed(1) + "%";

    document.querySelector(".years2019 label").innerHTML = "$" +formatBillion(data['4'].netIncome);
    document.querySelector(".years2020 label").innerHTML = "$" +formatBillion(data['3'].netIncome);
    document.querySelector(".years2021 label").innerHTML = "$" +formatBillion(data['2'].netIncome);
    document.querySelector(".years2022 label").innerHTML = "$" +formatBillion(data['1'].netIncome);
    document.querySelector(".years2023 label").innerHTML = "$" +formatBillion(data['0'].netIncome);
    document.querySelector(".p_PE label").innerHTML = "$" +((data1.EPS)*(data1.PERatio)).toFixed(1)  || "?";

    document.querySelector(".temp_profit label").innerHTML = ((Math.pow((data['0'].netIncome)/(data['4'].netIncome),1/5)-1)*100).toFixed(1) + "%";
    if((data['4'].netIncome)<0){
        document.querySelector(".temp_profit label").innerHTML = ((Math.pow((data['0'].netIncome)/(data['3'].netIncome),1/5)-1)*100).toFixed(1) + "%";
    }

    if((data1.PriceToSalesRatioTTM < 5 && data1.PERatio <13 && data1.PEGRatio <1)||(data1.PriceToSalesRatioTTM < 5 && data1.PERatio<13)||(data1.PriceToSalesRatioTTM < 5 && data1.PEGRatio <1)||(data1.PERatio <13 && data1.PEGRatio <1)){
        document.querySelector(".end h2 label").innerHTML = "Компания недооценена";
    }
    else if((data1.PriceToSalesRatioTTM > 7 && data1.PERatio >20 && data1.PEGRatio >2)||(data1.PriceToSalesRatioTTM > 7 && data1.PERatio >20)||(data1.PriceToSalesRatioTTM > 7 && data1.PEGRatio >2)||( data1.PERatio >20 && data1.PEGRatio >2)){
        document.querySelector(".end h2 label").innerHTML = "Компания переоценина";
    }
    else{
        document.querySelector(".end h2 label").innerHTML = "Компания справедливо оценина";
    }
   

   document.getElementById('dub').onclick = function(){
    const tt =  [data['0'].symbol];
    localStorage.setItem('box', JSON.stringify(tt));
   }


    
       
    

}


//async function News(){
    //response3 = await fetch(apiKey2 + `${apiKey1}`);
    //const data3 = await response3.json();
    //console.log(data3, "data");
   // document.querySelector(".newss p").innerHTML = data3;}
//News();


searchButton.addEventListener("click", () => {
    Calculation(searchInput.value);
    searchInput.value = "";
});

searchInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        Calculation(searchInput.value);
      searchInput.value = "";

    }
});




