import API_KEY from '../APIS/tmdbapikey';

const moviesrequest  = [
    {
        title: "Trending Movies",
        url: `/trending/movie/day?api_key=${API_KEY}`,
        media: "movie",
    },    
    {
        title: "Comedy",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
        media: "movie",
    },
    {
        title: "Action",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
        media: "movie",
    },
    {
        title: "Romance",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
        media: "movie",
    },
    {
        title: "Horror",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
        media: "movie",
    },
    {
        title: "Adventure",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
        media: "movie",
    },
    {
        title: "Crime",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=80`,
        media: "movie"
    },
    {
        title: "family",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=10751`,
        media: "movie",
    },
    {
        title: "Documentry",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
        media: "movie",
    },
    {
        title: "Science Fiction",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
        media: "movie",
    },
    {
        title: "Animation",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
        media: "movie",
    },
    {
        title: "Drama",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
        media: "movie"
    },    
    {
        title: "Thriller",
        url: `/discover/movie?api_key=${API_KEY}&with_genres=53`,
        media: "movie"
    }
    
]

export {moviesrequest};