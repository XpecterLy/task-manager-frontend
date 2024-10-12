import { ReactNode } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type modalProps = {
    onShowModalChange: (showVal: boolean) => void,
    onSelect: () => void,
    showVal: boolean,
    title: string,
    children: ReactNode
}

export const ModalComponent = (props: modalProps) => {
    const {children,onShowModalChange,showVal,title, onSelect} = props;

    return(
        <Modal show={showVal} onHide={() => onShowModalChange(!showVal)}>
        <Modal.Header closeButton>
          <Modal.Title>{ title && title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onShowModalChange(!showVal)}>
            Close
          </Button>
          <Button variant="primary" onClick={onSelect}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    )
}