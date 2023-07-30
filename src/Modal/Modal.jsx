import { IoCloseCircleSharp } from "react-icons/io5"
import { BiSolidCircle } from "react-icons/bi"
import './Modal.scss'

const Modal = ({character, closeModal}) => {
  console.log('entre')
  console.log(character)
  return (
    <div className='modal' onClick={closeModal}>
      <div className='modal__card'>        
        <IoCloseCircleSharp className='modal__card__closed' size={30} onClick={closeModal}/>
        <h3 className='modal__card__name'>{character.name}</h3>
        <div className='modal__card_content'>
          <img className='modal__card_content__img' src={character.image}/>
          <div className='modal__card_content__description'>
            <p>
              <BiSolidCircle size={20} style={character.status==='Alive'?{color:'green'}:character.status==='Dead'?{color:'red'}:{color:'gray'}}/>
              <span className='description'>{character.status}</span>
            </p>      
            <p className='category'>
              Specie: 
              <span className='description'>{character.species}</span>
            </p>
            <p className='category'>
              Gender: 
              <span className='description'>{character.gender}</span>
            </p>
            <p className='category'>
              Origin: 
              <span className='description'>{character.origin.name}</span>
            </p>
          </div>
        </div>              
      </div>      
    </div>
  );
};

export default Modal;