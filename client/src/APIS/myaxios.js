import axios from 'axios'

const instanace = axios.create({
    baseURL:"https://api.themoviedb.org/3",
});

export default instanace

