import ListEpisode from './ListEpisode/ListEpisode'
import './App.scss'


function App() {

  return (
    <div className='container'>
      <h2 className='container__subtitle'>LIST OF EPISODE</h2>
      <h1 className='container__title'>RICK AND MORTY</h1>
      <section className='container__body'>
        <img
        className='container__body--img' 
        src='https://res.cloudinary.com/dkddd5aky/image/upload/v1689883498/RickandMorty/rickandmorty_desktop.png' 
        alt='rickandmorty'/>
        <ListEpisode/>
      </section>
      <footer className='container__footer'>
        <p>Create by <a href='https://erickfabiandev.com/'> erickfabiandev </a></p>
      </footer>   
    </div >
  )
}

export default App
