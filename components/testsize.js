import { useState ,useEffect } from "react"

const Test = () => {
    const [width , setWidth ] = useState(undefined)
    const [height , setHeight] = useState(undefined)

    useEffect(()=>{
        const handleResize =()=>{
            setWidth( window.innerWidth)
            setHeight(window.innerHeight)
        }
        window.addEventListener('resize' , handleResize)
        return()=> window.removeEventListener('resize' , handleResize)
    },[])
    return (
        <div className="w-sceen h-screen bg-slate-500 text-center">
            <h1>{width} </h1><h1> {height} </h1>
        </div>
    );
}
 
export default Test;