import { useState } from "react";
import useSWR from "swr";

function WeatherData({lat , long }) {  
    
    const [ celcius , setCelcius] = useState(true)

    const days=['Sun' , 'Mon' , 'Tue ' , 'Wed' , 'Thu ' ,'Fri' , 'Sat']

    const TdayName = new Date().toLocaleDateString('en-us', { weekday:"long"})    

    const dayName = TdayName.slice(0,3)
    
    const todayIndex = days.indexOf(dayName , 0)    

    const tomorrowIndex = (todayIndex + 1) % 7    

    const dayAfTomIndex = (todayIndex+2) % 7

    const tommorrow = days[tomorrowIndex]  

    const dayAfTom = days[dayAfTomIndex]

    const fetcher = async(lat ,long) =>{        
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '200829e32fmsh0743b662f95f02bp187de7jsn00ff7bafcfe7',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        const res = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat}%2C${long}&days=3`, options)
        const data = await res.json()  
        
        return(data)
    }

    const { data, error } = useSWR(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat}%2C${long}&days=3` ,()=> fetcher(lat,long))
    if (error) return <div>failed to load</div>
    if (!data) return <div className="text-white">loading...</div>

  // render data
  return (
    <div className="pt-2 border-t-[1px] border-gray-400 text-white ">  
        <div className="flex justify-between ">
            <div className="">
                <p className="text-sm mb-2">{data.current.condition.text}</p>
                <p className={`${celcius ? `text-xl` : 'hidden'}`}>{data.current.temp_c}°<span className="text-sm">C</span></p>
                <p className={`${celcius ? `hidden` : 'text-xl'}`}>{data.current.temp_f}°<span className="text-sm">F</span></p>
            </div>
            <div className="">
                <img src='/animated/rainy-1.svg'/>
            </div>
        </div>
        <div className="flex text-center text-sm justify-between mt-3 ">
            <div>
                {dayName}
                <img src='/animated/rainy-1.svg'/>
                <div className={`${celcius ? 'block' : 'hidden'}`}>
                    <p className="text-[11px]">{data.forecast.forecastday[0].day.mintemp_c}°<span className="text-[13px]">C</span></p>
                    <p className="text-[11px]">{data.forecast.forecastday[0].day.maxtemp_c}°<span className="text-[13px]">C</span></p>
                </div>
                <div className={`${!celcius ? 'block' : 'hidden'}`}>
                    <p className="text-[11px]">{data.forecast.forecastday[0].day.mintemp_f}°<span className="text-[13px]">F</span></p>
                    <p className="text-[11px]">{data.forecast.forecastday[0].day.maxtemp_f}°<span className="text-[13px]">F</span></p>
                </div>
            </div>
            <div>
                {tommorrow}
                <img src='/animated/rainy-6.svg'/>
                <div className={`${celcius ? 'block' : 'hidden'}`}>
                    <p className="text-[11px]">{data.forecast.forecastday[1].day.mintemp_c}°<span className="text-[13px]">C</span></p>
                    <p className="text-[11px]">{data.forecast.forecastday[1].day.maxtemp_c}°<span className="text-[13px]">C</span></p>
                </div>
                <div className={`${!celcius ? 'block' : 'hidden'}`}>
                    <p className="text-[11px]">{data.forecast.forecastday[1].day.mintemp_f}°<span className="text-[13px]">F</span></p>
                    <p className="text-[11px]">{data.forecast.forecastday[1].day.maxtemp_f}°<span className="text-[13px]">F</span></p>
                </div>
            </div>
            <div>
                {dayAfTom}
                <img src='/animated/rainy-6.svg'/>
                <div className={`${celcius ? 'block' : 'hidden'}`}>
                    <p className="text-[11px]">{data.forecast.forecastday[2].day.mintemp_c}°<span className="text-[13px]">C</span></p>
                    <p className="text-[11px]">{data.forecast.forecastday[2].day.maxtemp_c}°<span className="text-[13px]">C</span></p>
                </div>
                <div className={`${!celcius ? 'block' : 'hidden'}`}>
                    <p className="text-[11px]">{data.forecast.forecastday[2].day.mintemp_f}°<span className="text-[13px]">F</span></p>
                    <p className="text-[11px]">{data.forecast.forecastday[2].day.maxtemp_f}°<span className="text-[13px]">F</span></p>
                </div>
            </div>
        </div>
        <div className="flex justify-between md:text-[11px] border-t-[1px] border-gray-400 mt-4 pt-3 ">
            <div className="flex">
                <div className={`px-2 border-r-[1px] cursor-pointer  ${celcius ? 'text-white' : 'text-gray-400'}`} onClick={()=>setCelcius(true)}>C</div>
                <div className={`px-2 cursor-pointer ${!celcius ? 'text-white' : 'text-gray-400'}`} onClick={()=>setCelcius(false)}>F</div>
            </div>
            <div className="text-[10px]  lg:text-xs  ">
                <a href='https://weather.com/weather/today/l/21.95,96.10?par=google'
                 className="text-indigo-300" target='_blank' rel='noreferrer'>
                    More on weather.com
                </a>
            </div>
        </div>
    </div>
  )
}

export default WeatherData;