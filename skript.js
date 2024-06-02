
const apiKey = "S2y7BgST9MlbkS1aQC2ReYGbMnukRHxT";
const apiUrl = `https://financialmodelingprep.com/api/v3/income-statement/`;
const apiKey1 = "TD36NGVPQQ18K0AM";
const apiUrl1 = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=`;
const apiKey2 = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=`+apiKey1;


const searchButton3 = document.querySelector(".search-box3 button");

const searchInput3 = document.querySelector(".search-box3 input");


function formatBillion(number) {
    let formattedNumber = (number / 1000000000).toFixed(1);
    formattedNumber = formattedNumber.replace(/\.?0+$/, '');
    return formattedNumber + " B";

}


async function Information(ticker){
    const response2 = await fetch(apiUrl1 + ticker + `&apikey=${apiKey1}`);
    const data4 = await response2.json();
    console.log(data4, "data");

    document.querySelector(".deskiption label").innerHTML = data4.Description|| "?";
    document.querySelector(".Sector label").innerHTML = data4.Sector|| "?";
    document.querySelector(".LatestQuarter label").innerHTML = data4.LatestQuarter || "?";
    document.querySelector(".MarketCapitalization label").innerHTML = "$" + formatBillion(data4.MarketCapitalization)|| "?";
    document.querySelector(".DividendPerShare label").innerHTML = data4.DividendDate|| "?";
    document.querySelector(".RevenuePerShare label").innerHTML = "$" + data4.RevenuePerShareTTM|| "?";
    document.querySelector(".AnalystTargetPrice label").innerHTML = "$" + data4.AnalystTargetPrice|| "?";
    document.querySelector(".DividendDate label").innerHTML = data4.DividendDate|| "?";
    document.querySelector(".weekHigh label").innerHTML = "$" + data4["52WeekHigh"]|| "?";
    document.querySelector(".weekLow label").innerHTML = "$" + data4["52WeekLow"] || "?";
    document.querySelector(".ExDividendDate label").innerHTML = data4.ExDividendDate|| "?";

}

searchButton3.addEventListener("click", () => {
    Information(searchInput3.value);
    searchInput3.value = "";
});

searchInput3.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      Information(searchInput3.value);
      searchInput3.value = "";

    }
});