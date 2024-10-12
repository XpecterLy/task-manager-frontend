import { ReactNode } from 'react';
import Card from 'react-bootstrap/Card';

type cardProps = {
    title: string,
    children: ReactNode,
    id: string
}

export function CardComponent(props: cardProps) {
    const {title, children, id} = props;
    
    return (
      <Card className='card' key={id} style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {children}
        </Card.Body>
      </Card>
    );
  }