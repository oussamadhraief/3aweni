import { useState } from "react";
   
  export default function SearchPageSuggestions() {
    const [TabSelection, setTabSelection] = useState<boolean>(true)
   
    return (
        
      <div  className="min-h-[500px] mb-24 mt-12 w-5/6 flex flex-col items-start body-container z-10" >
        <div className={TabSelection ? "mb-10 relative flex items-center justify-between w-52 after:absolute after:w-1/2 after:h-full after:top-0 after:left-0 after:bg-primary after:z-10 after:transition-all after:duration-300 after:rounded-xl h-8" : "relative flex items-center justify-between w-52 after:absolute after:w-1/2 after:h-full after:top-0 after:left-1/2 after:bg-primary after:z-10 after:transition-all after:rounded-xl h-8 mb-10"}>
          
            <button  className={TabSelection ? "w-1/2 z-20 text-white transition-all outline-none" : "w-1/2 z-20 text-black transition-all outline-none"} onClick={e => setTabSelection(true)}>
              Trending
            </button>

            <button  className={TabSelection ? "w-1/2 z-20 text-black transition-all outline-none" : "w-1/2 z-20 text-white transition-all outline-none"} onClick={e => setTabSelection(false)}>
              Near you
            </button>

        </div>
        
          {TabSelection && 
          <div className="min-h-[500px] overflow-visible fade-in-bottom">
                  
                  <div className='w-64 shadow-form pb-2 rounded bg-white'>
                      <img src="/africa.jpg" alt="" className='rounded-t' />
                      <p className='text-primary text-xs my-1 px-4'>Sousse, Tunisia</p>
                      <p className="font-semibold text-black text-sm px-2 leading-6 line-clamp-1">help 3awnouh</p>
                      <p className="line-clamp-2 leading-7 w-full text-sm px-2">dfsfdf sdfsdf fsdfsd Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet est iusto explicabo magnam ducimus esse rerum sed assumenda dolores saepe sint voluptate ut tempora sit minus, facilis qui itaque? Iusto?</p>
                      <p className='text-zinc-500 font-thin text-xs mt-10 px-2'>Dernier don 2 min</p>
                      <progress max="100" value="25" className="w-[96%] ml-[2%] h-2 overflow-hidden rounded bg-secondary/10 [&::-webkit-progress-bar]:bg-secondary/10 [&::-webkit-progress-value]:bg-secondary [&::-moz-progress-bar]:bg-secondary" />
                      <p className='text-zinc-500 font-thin text-xs mt-2 px-2'> <strong className='text-black font-bold'>52.000DT</strong> collectés men asl 1000DT</p>
                  </div>
                  
          </div>
  }
          {!TabSelection && <div className="min-h-[500px] overflow-visible fade-in-bottom">
                  
            <div className='w-64 shadow-form pb-2 rounded bg-white'>
                <img src="/africa.jpg" alt="" className='rounded-t' />
                <p className='text-primary text-xs my-1 px-4'>Sousse, Tunisia</p>
                <p className="font-semibold text-black text-sm px-2  w-full leading-6 line-clamp-1">heeeeeeeeeeeelp3awnouh</p>
                <p className="line-clamp-2 leading-7 w-full text-sm px-2">dfsfdf sdfsdf fsdfsd Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet est iusto explicabo magnam ducimus esse rerum sed assumenda dolores saepe sint voluptate ut tempora sit minus, facilis qui itaque? Iusto?</p>
                <p className='text-zinc-500 font-thin text-xs mt-10 px-2'>Dernier don 2 min</p>
                <progress max="100" value="25" className="w-[96%] ml-[2%] h-2 overflow-hidden rounded bg-secondary/10 [&::-webkit-progress-bar]:bg-secondary/10 [&::-webkit-progress-value]:bg-secondary [&::-moz-progress-bar]:bg-secondary" />
                <p className='text-zinc-500 font-thin text-xs mt-2 px-2'> <strong className='text-black font-bold'>52.000DT</strong> collectés men asl 1000DT</p>
            </div>
                  
          </div>
          }
      </div>
    );
  }
