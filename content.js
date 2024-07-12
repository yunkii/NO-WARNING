// Function to add a red border to the main div
function highlightMainDiv() {
  const mainDiv = document.querySelector('div[role="main"]');
  if (mainDiv) {
    mainDiv.style.border = "1px solid red";
  }
}

// Function to insert custom divs with rotating images before divs with exactly one class "x1lliihq"
function insertCustomBlockBefore() {
  const isFB = window.location.href.includes('facebook');
  const isIG = window.location.href.includes('instagram');
  const num = 4;
  if(isFB) {
    const allDivs = document.querySelectorAll('div.x1lliihq');
    allDivs.forEach(div => {
      if (div.classList.length === 1 && div.classList.contains('x1lliihq')) {
        if (!div.previousElementSibling || !div.previousElementSibling.classList.contains('customBlock')) {
            const customDiv = document.createElement('div');
            customDiv.className = 'customBlock';
            const image = document.createElement('img');
            const randomIndex = Math.floor(Math.random() * num) + 1;
            // console.log(randomInsert > 2)
              image.src = chrome.runtime.getURL(`assets/images/${randomIndex}.jpg`);
              image.alt = 'Custom Image';
              image.style.width = '100%';  // Adjust as needed
              customDiv.appendChild(image);
              div.parentNode.insertBefore(customDiv, div);

        }
      }
    });
  } else if(isIG) {
    console.log('isIG')
    const allArticles = document.querySelectorAll('article');
    
    allArticles.forEach(article => {
      if (!article.previousElementSibling || !article.previousElementSibling.classList.contains('customBlock')) {
          const customDiv = document.createElement('div');
          customDiv.className = 'customBlock';
          const image = document.createElement('img');
          const randomIndex = Math.floor(Math.random() * num) + 1;
          image.src = chrome.runtime.getURL(`assets/images/${randomIndex}.jpg`);
          image.alt = 'Custom Image';
          image.style.width = '100%';  // Adjust as needed
          customDiv.appendChild(image);
          article.parentNode.insertBefore(customDiv, article);
      }
    });
  }

}

// Run functions when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  // highlightMainDiv();
  insertCustomBlockBefore();
});

// Observer to re-run functions when new content is loaded dynamically
const observer = new MutationObserver(() => {
  highlightMainDiv();
  insertCustomBlockBefore();
});

observer.observe(document.body, { childList: true, subtree: true });
