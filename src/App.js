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
  document.getElementById("skip").removeAttribute('hidden');
  document.getElementById("learnMore").setAttribute('hidden',true);
  document.getElementById("next").setAttribute('hidden',true);
  document.getElementById("correctAnswer").setAttribute('hidden',true);
  document.getElementById("wrongAnswer").setAttribute('hidden',true);
  document.getElementById("options").removeAttribute('hidden');
  document.getElementById("confirm").removeAttribute('hidden');
  document.getElementById("question").removeAttribute('hidden');
  document.getElementById("animeImg").style="filter: blur(5px)";
}

React.useEffect( () => {
  const promise1 = createPromise();
  const promise2 = createPromise();
  const promise3 = createPromise();
  const promise4 = createPromise();
  //document.getElementById("options").setAttribute('hidden',false);
  Promise.all([promise1, promise2, promise3,promise4]).then((values) => {
    //console.log(values);
    setListAnime(values);
    chooseAnime(values);
  });
 
},[questionNumber]);

const validate = () =>{
  console.log(confirmation);
  console.log(anime.title);
  document.getElementById("animeImg").style="filter: blur(0px)";
  document.getElementById("skip").setAttribute('hidden',true);
  document.getElementById("confirm").setAttribute('hidden',true);
  document.getElementById("learnMore").removeAttribute('hidden');
  document.getElementById("next").removeAttribute('hidden');
  document.getElementById("options").setAttribute('hidden',true);
  document.getElementById("question").setAttribute('hidden',true);
  if (confirmation === anime.title){
    document.getElementById("correctAnswer").removeAttribute('hidden');
    setScore(score + 100);
  }else{
    document.getElementById("wrongAnswer").removeAttribute('hidden');
  }
}

const goThrought = () =>{
  setQuestionNumber(questionNumber+1);
}

const openInfo = () =>{
  window.open(anime.url);
}

console.log(listAnime,"soy list");
console.log(anime);
  return (
    <div>
      <div className='Title-div'>
        <img src={titleImage} className='Title-img' id="tittleImg"/>
        <div className='Question' id='question' >Question# {questionNumber} Choose the title of the anime in the image</div>
      </div>
      <div className="App">
        <Answer title={anime.title}/>
        <div id ="options" className='options'>
          {listAnime.map((option,index) => <Options
            title = {option.title}
            key = {index}
            setAnimeItem = {setConfirmation}/>
          )
          }
        </div>
        <div className='Anime-hint'>
          <span>
            <img src={anime.images.jpg.image_url} className='Anime-img' id='animeImg'/>
          </span>
          <div className='Synopsis-div'>{anime.synopsis}</div>
        </div>
      </div>
      <div>
        <div className='Container-buttons'>
          <button className='Button-option' onClick={validate} id='confirm'>Confirm</button>
          <button className='Button-option' id ='skip' onClick={goThrought}>Skip</button>
          <button className='Button-option' onClick={openInfo} id='learnMore'>Learn More...</button>
          <button className='Button-option' id='next' onClick={goThrought}>Next</button>
        </div>
        <div className='Score'>Score: {score}</div>
        <div className='Hint'>(Put the mouse over the image to see the synopsis of the anime)</div>
      </div>
    </div>
  );
}

export default App;
