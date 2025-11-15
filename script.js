
console.log("js working!");

//keywords for api fetching

const moodSynonyms = {
    "Happy":"funny+humour+comedy+happy",
    "Sad":"sad+melancholy+loss+emotional+heartbreak",
    "Adventurous":"adventurous+investigate+curious+finding",
    "Suspense":"suspense+thriller+dark+shady+crime+dead+murder",
    "Fantasy": "fantasy+fiction+magic+fairy+powers",
    "Spicy": "spicy+romance+steamy+smut+love+romace",
};

//mood buttons click events
const moodButtons=document.querySelectorAll(".mood-buttons button");

//getting book details section 
const displayBooks= document.querySelector(".books");

for(const eachButton of moodButtons){
    eachButton.addEventListener("click", ()=> {
        const mood = eachButton.id;
        fetchBooks(mood); // passing the specific button id 

    });
}

//search button click events
const searchButton=document.getElementById("Search");
searchButton.addEventListener("click", () => {
    const query = document.getElementById("book-search").value.trim();
    
    if (query!==""){
        fetchBooks(query);
    }

});

// api fetching for book details

async function fetchBooks(mood_or_query) {
    try{
        // fetching book details api 
        const keywords = moodSynonyms[mood_or_query] || mood_or_query; // placing list of keyword in array
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keywords}&maxResults=10`);
        const data = await response.json();
        console.log("books", data);
        
        // no matching keywords
        if (!data.items || data.items.length===0){
            const p = document.createElement("p");
            p.textContent="no books no worries try another keyword!";
            displayBooks.appendChild(p);
            return;
        }
        
        booksDetails(data.items);
 
    }

    catch(error){
        console.log("error in finding mood");
    }
}

// taking specific book details and displaying them
function booksDetails(books){

    displayBooks.innerHTML=""; // clearing previous results
    
    
    // taking specific book details
    for (const book of books) {
        const title = book.volumeInfo.title || "no title available";
        const author= book.volumeInfo.authors?.[0] || "unknown author";
        const cover = book.volumeInfo.imageLinks.thumbnail || "";
    

        // displaying books details 
        const section = document.createElement("section");
        section.className = "book-display";
        section.innerHTML = 
            `<img src="${cover}" alt="${title}">
            <h4>${title}</h4> 
            <h4><em>- ${author}</em></h4>`;
        
        displayBooks.appendChild(section); // adding each book with details
    }
}
