import { createContext , useEffect, useState } from "react";

export const PageContext = createContext(); 

const PageProvider = ({children}) => {

    const [ sidebar, setSidebar] = useState(true)
    const [ userSidebar , setUserSidebar ] =useState(true)
    const [value , setValue ] = useState('')
    const [isSearchPage , setIsSearchPage] = useState(false)
    const [searchData , setSearchData] = useState()
    const [searchmb , setSearchmb ] = useState(false)
    const [mbView , setmbView] = useState(false)
    const [widthOver580 , setWidthOver580 ] = useState(false)
    const [widthBelow580 , setWidthBelow580 ] = useState(false)
    const [isPageLoaded , setIsPageLoaded ] = useState(true)
    const [location , setLocation ] = useState({
        lat : null,
        long : null
    })

    const options = {
        method: 'GET',
        headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Key': '8763dbd93dmsh4a1b73dad25b14fp17f779jsn0c4a8d5ab79d',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
    };

    const fetcher =async() =>{       
        if (value==='') return;
        const res = await fetch(`https://bing-news-search1.p.rapidapi.com/news/search?q=${value}&freshness=Day&textFormat=Raw&safeSearch=Off` , options)
        const data = await res.json()
        setValue('')
        setIsSearchPage(true)
        setSearchData(data.value)
    }

    useEffect(()=>{
        
        const handleResize =()=>{
            console.log(window.innerWidth)
            if(window.innerWidth > '580'){
                if(!widthOver580){
                    console.log('width is over 580')
                    setSidebar(true)
                    setWidthOver580(true)
                    setWidthBelow580(false)
                }
                setmbView(false)
            }else{
                if(!widthBelow580){
                    console.log('width is below 580')
                    setSidebar(false)
                    setWidthBelow580(true)
                    setWidthOver580(false)
                }
                setmbView(true)
            }
        }
        window.addEventListener('resize' , handleResize)
    },[])    

    const context = {sidebar, setSidebar ,userSidebar , setUserSidebar ,
         value , setValue , isSearchPage ,  setIsSearchPage , fetcher , searchData ,
         isPageLoaded , setIsPageLoaded , location ,setLocation ,searchmb , setSearchmb 
    }
    return (
        <PageContext.Provider value={context}>
            {children}
        </PageContext.Provider>
    );
}
 
export default PageProvider;



