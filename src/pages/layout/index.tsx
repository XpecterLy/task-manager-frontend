import { ReactNode } from "react"
import "./style.css"

type layoudProps = {
    children: ReactNode
}

export function Layout(props: layoudProps){
    const {children} = props

    return (
        <div className="layoud-content">
            {children}
        </div>
    )
}