import './Answer.css'
import correctImg from './Correct.png'
import wrongImg from './Wrong.png'

const Answer= (props) =>{

    return(
        <div>
            <div id="correctAnswer">
                <div className='Answer'>Good Job !!
                    <div className='Anime-name'>{props.title}</div>
                    <img src={correctImg} className='Validation-img'/>
                    <div>Click on the Button "Learn More" to obtain more interesting data about the anime in the image</div>
                </div>
            </div>
            <div id="wrongAnswer">
                <div className='Answer'>Keep Trying !! the correct answer is:
                    <div className='Anime-name'>{props.title}</div>
                    <img src={wrongImg} className='Validation-img'/>
                    <div>Click on the Button "Learn More" to obtain more interesting data about the anime in the image</div>
                </div>
            </div>
        </div>
    )
}

export default Answer;