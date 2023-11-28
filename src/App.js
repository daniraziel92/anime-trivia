import './App.css';
import Options from './components/options/Options';
import React from 'react';
import titleImage from './TitleApp.png';
import loadingImage from './Loading.jpg';
import buttonsApp from './components/ButtonsApp/buttonsApp.Jsx';
import Answer from './components/Answer/Answer';

const listAnime = [{title:"Naruto"},
                        {title:"Cowboy Bebop" ,
                        images: 
                          {jpg:
                              {image_url: {loadingImage}}}},
                        {title:"One Piece"},
                        {title:"Jujutsu Kaisen"}];
const animeSample = listAnime[1];


function App() {

  const [anime,setAnime] =  React.useState(animeSample);
  const [listAnime, setListAnime] = React.useState([]);
  const [confirmation,setConfirmation] = React.useState("");
  const [score, setScore] = React.useState(0);
  const [questionNumber,setQuestionNumber] = React.useState(1);
  const refSkip = React.useRef(null);
  const refConfirm = React.useRef(null);
  const refLearnMore = React.useRef(null);
  const refNext = React.useRef(null);
  const refOptions = React.useRef(null);
  const refAnimeImg = React.useRef(null);
  const refQuestion = React.useRef(null);


  const createPromise = ()=>{
    return new Promise((resolve,reject)=>{
      fetch("https://api.jikan.moe/v4/random/anime")
      .then((response) => response.json())
      .then((responseJson) => {
          resolve(responseJson.data)
          })
      .catch((err)=>reject(err))
      });
  }

// const fetchData = () =>{
//   fetch("https://api.jikan.moe/v4/random/anime")
//   .then((response) => response.json())
//   .then((responseJson) => {
//       setAnime(responseJson.data);
//       //setListAnime((prev)=>[...prev,responseJson.data]);
//       })
// }

  const chooseAnime = (optionsAnime) =>{
    const randomAnime = Math.floor(Math.random()*4);
    console.log(randomAnime);
    setAnime(optionsAnime[randomAnime]);
    refSkip.current.removeAttribute('hidden',true);
    refLearnMore.current.setAttribute('hidden',true);
    refNext.current.setAttribute('hidden',true);
    document.getElementById("correctAnswer").setAttribute('hidden',true);
    document.getElementById("wrongAnswer").setAttribute('hidden',true);
    refOptions.current.removeAttribute('hidden');
    refOptions.current.removeAttribute('hidden');
    refConfirm.current.removeAttribute('hidden');
    refQuestion.current.removeAttribute('hidden');
    refAnimeImg.current.style="filter: blur(5px)";
  }

  React.useEffect( () => {
    const promise1 = createPromise();
    const promise2 = createPromise();
    const promise3 = createPromise();
    const promise4 = createPromise();
    //refOptions.current.setAttribute('hidden',false);
    Promise.all([promise1, promise2, promise3,promise4]).then((values) => {
      //console.log(values);
      setListAnime(values);
      chooseAnime(values);
    });
  
  },[questionNumber]);

  const validate = () =>{
    console.log(confirmation);
    console.log(anime.title);
    refAnimeImg.current.style="filter: blur(0px)";
    refSkip.current.setAttribute('hidden',true);
    refConfirm.current.setAttribute('hidden',true);
    refLearnMore.current.removeAttribute('hidden');
    refNext.current.removeAttribute('hidden');
    refOptions.current.setAttribute('hidden',true);
    refQuestion.current.setAttribute('hidden',true);
    if (confirmation === anime.title){
      document.getElementById("correctAnswer").removeAttribute('hidden');
      setScore( (prevScore)=> prevScore + 100);
    }else{
      document.getElementById("wrongAnswer").removeAttribute('hidden');
    }
  }

  const goThrought = () =>{
    setQuestionNumber((prevQuestionNumber)=>prevQuestionNumber+1);
  }

  const openInfo = () =>{
    window.open(anime.url);
  }

    return (
      <div>
        <div className='Title-div'>
          <img src={titleImage} className='Title-img'/>
          <div className='Question' ref={refQuestion} >Question# {questionNumber} Choose the title of the anime in the image</div>
        </div>
        <div className="App">
          <Answer title={anime.title}/>
          <div ref={refOptions} className='options'>
            {listAnime.map((option,index) => <Options
              title = {option.title}
              key = {index}
              setAnimeItem = {setConfirmation}/>
            )
            }
          </div>
          <div className='Anime-hint'>
            <span>
              <img src={anime.images.jpg.image_url} className='Anime-img' ref ={refAnimeImg}/>
            </span>
            <div className='Synopsis-div'>{anime.synopsis}</div>
          </div>
        </div>
        <div>
          <div className='Container-buttons'>
            <button className='Button-option' onClick={validate} ref = {refConfirm}>Confirm</button>
            <button className='Button-option' ref = {refSkip} onClick={goThrought}>Skip</button>
            <button className='Button-option' onClick={openInfo} ref = {refLearnMore}>Learn More...</button>
            <button className='Button-option' ref = {refNext} onClick={goThrought}>Next</button>
          </div>
          <div className='Score'>Score: {score}</div>
          <div className='Hint'>(Put the mouse over the image to see the synopsis of the anime)</div>
        </div>
      </div>
    );
}

export default App;
