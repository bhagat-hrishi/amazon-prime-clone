import API_KEY from '../APIS/tmdbapikey';

const kidsrequests  = [
    {
        title : 'Kids TV',
        url: `/discover/tv?api_key=${API_KEY}&with_genres=10762`,
        media:"tv"
    },
    {
        title : 'Family TV',
        url: `/discover/tv?api_key=${API_KEY}&with_genres=10751`,
        media:"tv"
    },
    {
        title : 'Family Movies',
        url: `/discover/movie?api_key=${API_KEY}&with_genres=10751`,
        media: "movie"
    }
]

export {kidsrequests};