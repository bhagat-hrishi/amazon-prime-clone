import API_KEY from '../APIS/tmdbapikey';

const tvrequests  = [
    {
        title : 'Action and Adventure TV',
        url: `/discover/tv?api_key=${API_KEY}&with_genres=10759`,
        media: "tv"
    },
    {
        title : 'Animation TV',
        url: `/discover/tv?api_key=${API_KEY}&with_genres=16`,
        media: "tv"
    },
    {
        title : 'Drama TV',
        url: `/discover/tv?api_key=${API_KEY}&with_genres=18`,
        media: "tv"
    },
    {
        title : 'Comedy TV',
        url: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
        media: "tv"
    },
    {
        title : 'Family TV',
        url: `/discover/tv?api_key=${API_KEY}&with_genres=10751`,
        media: "tv"
    },
    {
        title : 'Kids TV',
        url: `/discover/tv?api_key=${API_KEY}&with_genres=10762`,
        media: "tv"
    },
    {
        title : 'Mystrey TV',
        url: `/discover/tv?api_key=${API_KEY}&with_genres=9648`,
        media: "tv"
    },
    {
        title : 'Crime TV',
        url: `/discover/tv?api_key=${API_KEY}&with_genres=80`,
        media: "tv"
    },
    {
        title : 'Sci-Fi & Fantasy TV',
        url: `/discover/tv?api_key=${API_KEY}&with_genres=10765`,
        media: "tv"
    },
    {
        title : 'War & Politics TV',
        url: `/discover/tv?api_key=${API_KEY}&with_genres=10768`,
        media: "tv"
    },
    {
        title : 'Western TV',
        url: `/discover/tv?api_key=${API_KEY}&with_genres=37`,
        media: "tv"
        
    }
]

export {tvrequests};