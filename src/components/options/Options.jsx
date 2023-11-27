import './Options.css'

const Options = (props) => {
const handlerSelectOption = (e) => {
    props.setAnimeItem(e.target.name);
    // document.getElementsByName(e.target.name).style.background-color ="yellow";
    //document.getElementsByName(e.target.name).style.color = "blue";
}

return (
    <div>
    <button className='Option-box' onClick={handlerSelectOption} name={props.title}>
           {props.title}
    </button>
    </div>
)
};
export default Options;