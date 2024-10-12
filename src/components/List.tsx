import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

type listProps = {
    data: string[]
}

export function ListComponent(props: listProps){

    const [index, setIndex] = useState(0);

    const handleSelectItem = (i: number) => {
        setIndex(i)
    }

    const {data} = props;
    
    return(
        <ListGroup as="ul">
            {data.map((item, i) => {
                return(
                    <ListGroup.Item key={i} as="li" onClick={() => handleSelectItem(i)} active={i==index}>
                        {item}
                        {/* <div className="d-flex justify-content-end">
                            <button className="btn btn-primary">Botón</button>
                        </div> */}
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}