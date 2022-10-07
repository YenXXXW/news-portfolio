import { useContext, useEffect } from 'react';
import PageComponent from '../components/pageComponent';
import { PageContext } from '../components/pageContext';
import { useRouter } from 'next/router';
import Head from 'next/head';
import WeatherData from '../components/weatherData';


function TopStories({headlines}) {
    
    const { sidebar , isSearchPage , setIsSearchPage ,searchData } = useContext(PageContext)
    const { location , setLocation , isPageLoaded , setIsPageLoaded } =useContext(PageContext)
    const router = useRouter()
   
    //accessing the location //
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            setLocation({
                lat : position.coords.latitude ,
                long : position.coords.longitude
            })            
        })
    },[]);

    useEffect(()=>{
        setIsSearchPage(false)
    },[])
    
    useEffect(()=>{
        const handleRouteChange =()=>{
            setIsPageLoaded(false)
        }
        
        router.events.on('routeChangeStart' , handleRouteChange)
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
          } 
    })
    
    useEffect(()=>{
        const handleRouteChange =()=>{
            setIsPageLoaded(true)
        }
        
        router.events.on('routeChangeComplete' , handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
          } 
    })

    if(isSearchPage){
        return(
            <div className={`pt-[100px] bg-[#202124]  min-h-[100vh] text-white flex justify-center px-3`}>
                <Head>
                    <title>Google News - Search</title>
                    <meta name='description' content='google news clone by wai'/>
                    <link rel='icon' href='/Google_news_logo.png'/>
                </Head>
                <div className={`max-w-[680px]`}>
                    {
                        searchData.map((headline, i)=>{
                            return(
                                <div key={i}>
                                    <PageComponent headline={headline}/>
                                </div>                                   
                            )                        
                        })
                    }
                </div>
            </div>
        )
    }

    return (
        <div className='bg-[#202124]'>
            <Head>
                <title> Google News - Top Stories</title>
                <meta name='description' content='google news clone by wai'/>
                <link rel='icon' href='/Google_news_logo.png'/>
            </Head>
            <div className={`${isPageLoaded ? 'hidden': 'block fixed top-0 left-0 bg-white/60 z-20 w-full h-full'}`} />
            <div className={`flex ${sidebar? 'md:justify-between' : '' }`}>
                <div className={`pt-[100px] bg-[#202124] min-h-[100vh]  text-white ${sidebar ? 'px-6  ex:pl-[270px]' : ' ex:pl-20 px-6'}`}>
                    <div className={`${sidebar ? ' ex:max-w-[45vw]' : 'ex:max-w-[60vw]'}`}>
                        {
                            headlines.map((headline, i)=>{
                                return(
                                    <div key={i}>
                                        <PageComponent headline={headline}/>
                                    </div>                                   
                                )                        
                            })
                        }
                    </div>                
                </div>
                {/* weather data div */}
                
                <div className={`  hidden ex:block border-[1px] rounded-lg border-gray-600 px-5 py-5 ${sidebar ? 'w-[23vw] ml-0' : ' w-[26vw] ml-[5vw] '} h-[330px] mt-[120px] mx-2`}>
                    <div className="pb-2 mb-2">
                        <p className="text-center text-sm text-gray-400">Your local weather</p>
                    </div>
                    <WeatherData lat={location.lat} long={location.long}/>
                </div>
                
            </div>
        </div>
    );
}

export default TopStories;

export  async function getServerSideProps(){
    const options = {
        method: 'GET',
        headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Key': '8763dbd93dmsh4a1b73dad25b14fp17f779jsn0c4a8d5ab79d',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
    };
    
    const res= await fetch('https://bing-news-search1.p.rapidapi.com/news/search?q=topstories&freshness=Day&textFormat=Raw&safeSearch=Off', options)
    const data = await res.json()
    return{
        props :{
            headlines : data.value
        }
    }

}