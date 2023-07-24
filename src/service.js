import axios from "axios"

export  async function getEpisodeWithCharacters(episodes, characters){
  const episodeWithCharacters = await Promise.all (episodes.map( async (episode) => {
      const charactersByEpisode =await Promise.all (episode.characters.slice(0,10).map(async (character) => {
        const result = characters.find((item)=>item.url===character)
        if(result==undefined){
          const newCharacter =  await axios.get(character)         
          characters.push(newCharacter.data)
          return newCharacter.data
        }
        else{
          return result
        }        
      }
      ))
      return ({
        ...episode,
        characters: charactersByEpisode
      })
    }

    ))
    return episodeWithCharacters
}
