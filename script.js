// Get quotes From API
const quoteContainer  = document.getElementById('quote-container');
const quoteText  = document.getElementById('quote');
const authorText  = document.getElementById('author');
const twitterBtn  = document.getElementById('twitter');
const newQuoteBtn  = document.getElementById('new-quote');
const loader  = document.getElementById('loader');



//show loading
function loading () {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading 
function complete () {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

let apiQuotes = []; 
//show new quote
function newQuote() {
    //pick a random quote from apiquotes array
    loading();
    const quote  = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author)
        {
            authorText.textContent = 'Unknown';
        }
    else {
        authorText.textContent = quote.author;
    }

    if(quote.text.length  > 50) 
        quoteText.classList.add('long-quote');
    else
        quoteText.classList.remove('long-quote');
    // set quote , hide loader
    quoteText.textContent = quote.text;
    complete();


}

async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        //console.log(apiQuotes);
        //check if author field is blank and replace it with 'Unknown'

        newQuote();
    }
    catch(error)
    {
        // catch error here 
    }
}

//to tweet a code
function tweetQuote() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweetUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click' , newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
//loading();