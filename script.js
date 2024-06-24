const accesskey = "XhSd737h0gKjAx8fTcjqr30pbueZGQSyjvS5opN8_5M";
const searchForm = document.getElementById("Search-form");
const searchBox = document.getElementById("Search-box");
const searchResult = document.getElementById("Search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const mainBody = document.getElementById("main-body");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}`;
    const response = await fetch(url);
    const data = await response.json();
    displayImages(data.results);
    if (data.total_pages > page) {
        showMoreBtn.style.display = "block";
    } else {
        showMoreBtn.style.display = "none";
    }
    console.log(data);
    mainBody.classList.remove("with-background"); // Remove background after images load
}

function displayImages(images) {
    if (page === 1) {
        searchResult.innerHTML = ""; // Clear previous results if it's a new search
    }

    images.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = image.urls.small;
        searchResult.appendChild(imgElement);
    });
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    mainBody.classList.add("with-background"); // Add background when searching
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
