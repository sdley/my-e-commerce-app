import './List.scss';

export default function List(props){

    return (
        <div className="List">
            {props.children}
        </div>
    );
}