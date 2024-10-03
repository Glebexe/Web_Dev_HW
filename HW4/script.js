async function loadGames() {
    const response = await fetch('games.json');
    const games = await response.json();
    displayGames(games);
    return games
}

function displayGames(games) {
    const gameCards = document.getElementById('game-cards');
    gameCards.innerHTML = '';
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <h3>${game.title}</h3>
            <p>Rating: ${game.rating}</p>
            <p>Release Date: ${game.release_date}</p>
            <p>Genre: ${game.genre}</p>
        `;
        gameCards.appendChild(card);
    });
}

function sortGames(criteria) {
    loadGames().then(games => {
        games.sort((a, b) => {
            if (criteria === 'title') {
                return a.title.localeCompare(b.title);
            } else if (criteria === 'rating') {
                return b.rating - a.rating;
            } else if (criteria === 'release_date') {
                return new Date(a.release_date) - new Date(b.release_date);
            }
        });
        displayGames(games);
    });
}

window.onload = loadGames;