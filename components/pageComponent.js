import { useState } from 'react';
import { MdOutlineKeyboardArrowDown , MdKeyboardArrowUp , MdTableView} from 'react-icons/md';

const PageComponent = ({headline}) => {

    const [ hide , setHide ] = useState(true)
    return (
        <div className='flex mt-4 border-[1px] border-gray-600 rounded-lg py-3 p-3 '>
            <div className='w-[80%]'>
                <div>
                    <p className='text-sm sm:text-base'>{headline.name}</p>
                </div>
                <div className="flex text-xs mt-2 text-gray-500">
                    <p>{headline['provider'][0]['name']}</p>
                    <p className="ml-4">{headline['datePublished'].slice(0,10)}</p>
                </div>  
                <div className={hide ? "hidden" : "pt-5 text-sm pl-5"}>
                    <p>{headline.description}</p>
                </div>
                <a href={headline.url} target='_blank' rel='noreferrer'>
                    <div className={hide ? ` hidden` : 'flex my-3 text-[#4e7cc7] cursor-pointer hover:underline'}>
                        <MdTableView />
                        <p className='ml-1 text-xs'>View full Coverage</p>
                    </div>
                </a>
                
                <div className={ hide ? "block" : "hidden"} onClick={()=>setHide(!hide)}>
                    <MdOutlineKeyboardArrowDown size='20' className=" mt-7 cursor-pointer"/>
                </div> 
                <div className={ hide ? "hidden" : "block"} onClick={()=>setHide(!hide)}>
                    <MdKeyboardArrowUp size='20' className=" mt-3 cursor-pointer"/>
                </div>     
            </div>
            <div className='ml-4' >
                { headline.image && 
                ( <img src={headline.image.thumbnail.contentUrl} className='rounded-md'/>) }

            </div>
            
        </div>

    );
}
 
export default PageComponent;