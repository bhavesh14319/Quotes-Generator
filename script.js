// fetching api

const quoteContainer  = document.getElementById('quote-container');
const quoteText  = document.getElementById('quote');
const authorText  = document.getElementById('author');
const twitterBtn  = document.getElementById('twitter');
const newQuotetn  = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quotes = [];

//show loader
function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

//remove loader
function removeLoadingSpinner(){
    if(!loader.hidden){
    loader.hidden=true;
    }
    quoteContainer.hidden=false;
}


function showNewQuote(){
    const quote =quotes[Math.floor((Math.random()*quotes.length))];
    //check if author in null set it to unkown
    if(!quote.author){
        authorText.textContent='Unkown';
    }else{
        authorText.textContent=quote.author;
    }

    // check if quote is very long if it is then change the font size by adding long-quote class

    if(quote.text.length>100){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;
    removeLoadingSpinner();
 
}


async function getQuotesFromApi(){
    showLoadingSpinner();
    const url = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(url);
        quotes = await response.json();
        showNewQuote();
    }catch(error){
        console.log(error);
    }
}

//Tweet quote

function tweeetQuote(){
    const twitterUrl  =   `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
newQuotetn.addEventListener('click',getQuotesFromApi);
twitterBtn.addEventListener('click',tweeetQuote);


getQuotesFromApi();
