

//second page js

// Array of quotes
const quotes = [
    "\"Up to 783 million people - one in 10 of the world's population - still go to bed hungry every night.\"",
    "\"Every plate shared is a symbol of hope, nourishing both the body and the soul.\"",
    "\"20% of a population are suffering extreme food shortages. 30% of children under the age of 5 are suffering acute malnutrition.\"",
    "\"No one has ever become poor by giving.\"",
    "\"There are people in the world so hungry, that God cannot appear to them except in the form of bread.\"",
    "\"To deny people their human rights is to challenge their very humanity.\""
];

let currentIndex = 0;

// Function to display quotes
function displayQuote() {
    const quoteElement = document.getElementById("quote");
    const quoteContainer = document.getElementById("quote-container");
    quoteContainer.style.opacity = 0;
    quoteContainer.style.filter = "blur(5px)";
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % quotes.length;
        quoteElement.textContent = quotes[currentIndex];
        quoteContainer.style.opacity = 1;
        quoteContainer.style.filter = "none";
    }, 500); // Wait for 0.5s (transition duration) before updating content and removing blur
}

// Display initial quote
displayQuote();

// Function to display quotes at regular intervals
setInterval(displayQuote, 10000); // 10000 milliseconds = 10 seconds


//third-page js
document.addEventListener("DOMContentLoaded", function() {
    const thirdPage = document.getElementById('leaderboard');
    const thirdBoxes = document.querySelectorAll('.third-box');
    let hasScrolledToThirdPage = false;
    let timeoutIds = [];

    function handleScroll() {
        const thirdPageTop = thirdPage.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (thirdPageTop <= windowHeight && !hasScrolledToThirdPage) {
            hasScrolledToThirdPage = true;
            thirdBoxes.forEach((box, index) => {
                timeoutIds.push(setTimeout(() => {
                    box.classList.add('fade-in');
                }, index * 500)); // 500ms delay between each box
            });
        } else if (thirdPageTop > windowHeight && hasScrolledToThirdPage) {
            // User has scrolled away from page 3, reset the flag and clear timeouts
            hasScrolledToThirdPage = false;
            timeoutIds.forEach((timeoutId) => {
                clearTimeout(timeoutId);
            });
            timeoutIds = [];
            // Also remove the 'fade-in' class from boxes if you want them to reappear when user scrolls back to page 3
            thirdBoxes.forEach((box) => {
                box.classList.remove('fade-in');
            });
        }
    }

    window.addEventListener('scroll', handleScroll);
});

