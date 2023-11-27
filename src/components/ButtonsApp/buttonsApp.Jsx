import './ButtonsApp.css'

const buttonsApp = (props) => {

    const validate = (e) =>{
        console.log(props.confirmation);
        console.log(props.title);
        document.getElementById("animeImg").style="filter: blur(0px)";
        document.getElementById("skip").setAttribute('hidden',true);
        document.getElementById("confirm").setAttribute('hidden',true);
        document.getElementById("learnMore").removeAttribute('hidden');
        document.getElementById("next").removeAttribute('hidden');
        if (props.confirmation === props.title){
        document.getElementById("options").setAttribute('hidden',true);
        document.getElementById("correctAnswer").removeAttribute('hidden');
        }else{
      
        }
      };
    
    const openInfo = (e) =>{
        window.open(props.url);
      };

    return (
      <div className='Container-Buttons'>
        <button className='Button-Option' onClick={validate} id='confirm'>Confirm</button>
        <button className='Button-Option' id ='skip'>Skip</button>
        <button className='Button-Option' onClick={openInfo} id='learnMore'>Learn More...</button>
        <button className='Button-Option' id='next'>Next</button>
      </div>
    );
}



export default buttonsApp;