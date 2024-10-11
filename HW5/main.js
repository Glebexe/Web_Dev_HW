new Vue({
    el: '#app',
    data: {
        searchQuery: '',
        games: []
    },
    created() {
        fetch('games.json')
            .then(response => response.json())
            .then(data => {
                this.games = data;
            })
            .catch(error => console.error('Error loading JSON:', error));
    },
    computed: {
        filteredGames() {
            return this.games.filter(game => {
                return game.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                       game.genre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                       game.release_date.includes(this.searchQuery) ||
                       game.rating.toString().includes(this.searchQuery);
            });
        }
    }
});
