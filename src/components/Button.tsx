import Button from 'react-bootstrap/Button';
import "./Button.css"
import { ReactNode } from 'react';

type ButtonCustomProps = {
    text?: string,
    onSelect?: () => void
    isLoading: boolean
    variant?: string
    children?: ReactNode
}

export function ButtonCustom(props: ButtonCustomProps){
    const {text, onSelect, isLoading, variant, children} = props
    return(
        <Button 
            variant={`${variant && !isLoading? variant : "primary"}`}
            disabled={isLoading}
            onClick={() => onSelect?.()}
        >
            {!isLoading ? text : "Cargando..."}
            {children}
        </Button>
    )
}
    
export function ButtonSubmitCustom(props: ButtonCustomProps){
    const {text, onSelect, isLoading, variant, children} = props

    return(
        <Button 
            type='submit'
            variant={`${variant && !isLoading? variant : "Primary"}`}
            disabled={isLoading}
            onClick={() => onSelect?.()}
        >
            {!isLoading ? text : "Cargando..."}
            {children}
        </Button>
    )
}

type ButtonProps = {
    style: string,
    onSelect: () => void
}

export function ButtonFloat(props: ButtonProps){
    const {onSelect, style} = props;
    return(
        <a onClick={onSelect} className={`btn btn-${style} floating-button`} title='Agregar'><i className="bi bi-file-plus"></i></a>
    )
}