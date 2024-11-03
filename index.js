// look back at the <readme.md> file for some hints //
// working API key //

document.addEventListener("DOMContentLoaded", function () {
    const giphyApiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";

    const searchForm = document.querySelector('#search-form');
    const searchInput = document.querySelector('#search-term');
    const removeButton = document.querySelector('#remove-button');
    const gifContainer = document.querySelector('#gifs-container');

    //Call Giphy API using the search keyword
    searchForm.addEventListener("submit", generateGifs);

    async function generateGifs(event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();
        console.log('searchTerm-->', searchTerm);
        searchInput.value = "";
        const gifs = await giphyRequest(searchTerm);
        console.log('gifs-->', gifs);
        const firstRow = document.createElement("div");
        const secondRow = document.createElement("div");
        firstRow.classList.add("row", "first");
        secondRow.classList.add("row", "second");
        for (let i = 0; i < gifs.length / 2; i++) {
            const gifElement = document.createElement("img");
            gifElement.src = gifs[i].gifURL;
            firstRow.appendChild(gifElement);
        }
        for (let i = 5; i < gifs.length; i++) {
            const gifElement = document.createElement("img");
            gifElement.src = gifs[i].gifURL;
            secondRow.appendChild(gifElement);
        }
        gifContainer.appendChild(firstRow);
        gifContainer.appendChild(secondRow);
    }

    //Call Giphy asynchronously using axios and append gifs
    async function giphyRequest(word) {
        const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${word}&limit=10`);
        console.log('response-->', response.data.data);
        return response.data.data.map(item => { return { gifURL: item.images.fixed_width.url } });
    }

    removeButton.addEventListener("click", function (event) {
        console.log('remove images clicked');
        gifContainer.innerHTML = "";
    })
})