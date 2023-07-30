import { useEffect, useState } from "react"
import axios from "axios"
import { getEpisodeWithCharacters } from '../service'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import './ListEpisode.scss'
import Loading from "../Loading/Loading"
import Modal from "../Modal/Modal"

const ListEpisode = () =>{
  const url = import.meta.env.VITE_APIVITE_API_BASE_URL
  const [ data, setData] = useState([])
  const [loading, setLoading] =useState(false)
  const [ idvisibility, setIdVisibility ] = useState(-1)
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  useEffect(()=>{     
    getData()
  },[])

  
  const getData = async() =>{
    try {
      setLoading(true)
      const [ dataEpisodes, dataCharacters ] = await Promise.all([getEpisodes(), getCharacters()])
      const episodes = dataEpisodes.data.results
      let characters = dataCharacters.data.results
      const updateData = await getEpisodeWithCharacters(episodes, characters)     
      setData(updateData)
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }

  const handleVisible = (id) => {
    id===idvisibility?setIdVisibility(-1):setIdVisibility(id)
  }

  const getEpisodes = () => {
    return axios.get(`${url}/episode`)
  }
  
  const getCharacters = () => {
    return axios.get(`${url}/character`)
  }

  const openModal = (character) => {
    setSelectedCharacter(character);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
    setModalOpen(false);
  };

  if(loading){
    return <Loading/>
  }

  return(
    <div className='listEpisode'>
      {(data && data.length!=0)?
        data.map ((item) => {
          return (
            <div className='listEpisode__episode' key={item.id}>
              <div className='listEpisode__episode__heard'>
              <BsFillPlusCircleFill className='heard--button' onClick={()=>handleVisible(item.id)} size={20}/>
                <h2 className='heard--text'>{`${item.id}. ${item.name}`}</h2>                
              </div>
              <div className={`listEpisode__episode__body ${idvisibility!=item.id?'novisible':''}`}>
                  <h3>1.-Air date:<p>{item.air_date}</p></h3>
                  <h3>2.-Characters:</h3>
                  <ul>
                    { item.characters.map((character,index)=>{
                      return(
                        <li key={index}>
                          <a className='body_character' onClick={()=>openModal(character)}>{`${character.name} - ${character.species}`}</a>                          
                        </li>                
                      )})
                    }
                  </ul>                                
              </div>            
            </div>
          )
        })
        :<Loading/>
        }
        {isModalOpen && selectedCharacter && <Modal character={selectedCharacter} closeModal={closeModal}/>}      
    </div>
  
    
  )
}
export default ListEpisode
