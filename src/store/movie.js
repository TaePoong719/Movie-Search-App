import { Store } from '../core/heropy'

const store = new Store({
  searchText: '', 
  page: 1,
  pageMax: 1,
  movies: [],
  movie:{},
  loading: false,
  message: 'Search for the movie title!'
})

export default store
export const searchMovies = async page => {
  store.state.loading = true
  store.state.page = page
  if(page === 1){
    store.state.movies = []
    store.state.message = ''
  }
  try{
    // 정보를 담아 보내려면 POST방식을 이용
    // body에는 string만 보낼 수 있음

    const res = await fetch('./api/movie', {
      method: 'POST',
      body: JSON.stringify({
        title: store.state.searchText,
        page
      })
    })
    const { Search, totalResults, Response, Error } = await res.json()
    if(Response === "True"){
      // n+1 페이지 로드 시 n 페이지 + n+1페이지를 합쳐서 다시 state.movies 에 할당
      store.state.movies = [
        ...store.state.movies,
        ...Search
      ]
      store.state.pageMax = Math.ceil(Number(totalResults) / 10)
    }else{
      store.state.message = Error
      store.state.pageMax = 1
    }
  }catch(error){
    console.log('searchMovies error:', error)
  }finally{
    store.state.loading = false
  }
  
  
}

export const getMovieDetails = async id => {
  try{
    const res = await fetch('/api/movie',{
      method: 'POST',
      body:JSON.stringify({
        id
      })
    })
    store.state.movie = await res.json()

  }catch(err){
    console.log('getMovieDetails error',err)
  }
  
}