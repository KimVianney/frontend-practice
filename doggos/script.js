const button = document.querySelector('.main-btn');
const DOG_URL = "https://dog.ceo/api/breeds/image/random"


function fetchDog() {
    const promise = fetch(DOG_URL);
    promise
        .then(function(response){
            const image_data = response.json();
            console.log(image_data)
            return image_data;
        })

        .then((image) => {
            const img = document.createElement("img");
            img.src = image.message;
            img.className = "img";
            contentSection = document.querySelector('.content');
            contentSection.appendChild(img);
        });
}

button.addEventListener("click", fetchDog);