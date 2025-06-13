/* Waitlist */
const waitlistForm = document.getElementById("waitlistForm");

if (waitlistForm) {
    waitlistForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("waitlistEmail").value.trim();
        const radios = document.querySelectorAll('input[name="notifications"]');
        let notification = "";

        for (const radio of radios) {
            if (radio.checked) {
                notification = radio.value;
            }
        }

        if (!email) {
            alert("Email is required");
            return;
        }

        if (!notification) {
            alert("Please select notification preference");
            return;
        }

        alert(`Thanks for joining the waitlist!\nEmail: ${email}\nNotifications: ${notification}`);
    });
}

/* news */
const newsContainer = document.getElementById("news");
const searchInput = document.getElementById("searchInput");

if (newsContainer) {
    function fetchNews(query) {
        newsContainer.innerHTML = "<p>Loading...</p>";

        fetch("https://hn.algolia.com/api/v1/search?query=" + query)
            .then(response => response.json())
            .then(data => {
                const articles = data.hits;
                newsContainer.innerHTML = "";

                if (articles.length === 0) {
                    newsContainer.innerHTML = "<p>No results found.</p>";
                    return;
                }

                articles.forEach(article => {
                    const card = document.createElement("div");
                    card.className = "news-card";

                    const title = article.title || "No Title";
                    const url = article.url || "#";

                    card.innerHTML = `
            <h3>${title}</h3>
            <a href="${url}" target="_blank">Read more</a>
          `;

                    newsContainer.appendChild(card);
                });
            })
            .catch(error => {
                newsContainer.innerHTML = "<p>Error loading news.</p>";
            });
    }

    function searchNews() {
        const query = searchInput.value.trim();
        fetchNews(query || "technology");
    }

    fetchNews("technology");

    document.querySelector(".search-bar button").addEventListener("click", searchNews);
}
