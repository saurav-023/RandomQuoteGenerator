const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const TwitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');


let apiQuotes = [];


// Show new quote
function newQuote(){
  //Pick a random quote from API fetch
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if author field is empty to replace with "Unknown"
  if(!quote.author){
    quoteAuthor.textContent = "Unknown";
  }else{
    quoteAuthor.textContent = quote.author;
  }
  // Check quote length to determine styling
  if(quoteText.length > 120){
    quoteText.classList.add('long-quote');
  } else{
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
}
// Get quotes from API
async function getQuotes()
{
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    }
    catch(error){
      alert(error);
    }
}

// Tweet a quote
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteButton.addEventListener('click', newQuote);
TwitterButton.addEventListener('click', tweetQuote);


// main function
getQuotes();
