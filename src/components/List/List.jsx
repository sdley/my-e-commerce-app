import './List.scss';

export default function List(props){

    return (
        <div className="List">
            {/* <div className="Items-List"> */}
            {props.children}
            {/* </div> */}
        </div>
    );
}