import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { IconContext } from 'react-icons'
import { MdIosShare } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { fundraiserInt } from '../../utils/interfaces'
import { AiFillWarning } from 'react-icons/ai'
import useAuthContext from '../../hooks/useAuthContext'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'


export default function SingleFundraiser() {

    const carousel = useRef<HTMLDivElement>(null)
    const { id } = useParams()
    const { user } = useAuthContext()

    const [Fundraiser, setFundraiser] = useState<fundraiserInt>({_id: "", category: "", state: "", zipCode: 0, type: "", goal: '', user: '', description: '', image: null, title: '', secondaryImages: [], secondaryVideos: [] })
    const [WarningOpen, setWarningOpen] = useState<boolean>(true)
    const [ShowMain, setShowMain] = useState({type: 'image', index: 0})

    useEffect(() => {
        if(id){
            axios.get(`/api/fundraiser/${id}`,{
                withCredentials: true
            }).then((response) => {
                const { data: { fundraiser }} = response
                
                setFundraiser(fundraiser)
            })
        }
    },[])

    const handleScrollLeftCarousel = () => {
        carousel.current?.scroll(carousel.current?.scrollLeft - carousel.current?.offsetWidth, 0)
    }


    const handleScrollRightCarousel = () => {
        carousel.current?.scroll(carousel.current?.scrollLeft + carousel.current?.offsetWidth, 0)
    }

  return (
    <main className='relative mt-[94px] py-24  flex flex-col items-center justify-center'>
            <section className="w-full max-w-6xl mx-auto flex flex-col text-gray-600 px-5">
                {(user?._id === Fundraiser.user && WarningOpen) && <div className='fixed bottom-0 left-0 bg-lighter_primary/80 w-full flex justify-between items-center py-3 px-10 text-primary z-50'>
                    <button className='absolute top-0 right-3 text-lg' onClick={() => setWarningOpen(false)}>x</button>
                    <div className='flex items-center gap-3'>
                        <IconContext.Provider value={{ className: 'w-7 h-7'}}>
                                <AiFillWarning />
                            </IconContext.Provider>
                        <div>
                            <p className='text-sm'>Vous êtes le propriétaire de ce 3aweni </p>
                            <p className='text-xs text-gray-600 flex flex-nowrap items-center gap-2'>
                                Vous devez ajouter une image principale pour rendre votre 3aweni visible aux utilisateur
                            </p>
                        </div>
                    </div>
                    <Link to={`/dashboard/fundraisers/${Fundraiser._id}`} className='text-sm text-primary border border-primary px-2 py-1 rounded'>
                        Vous pouvez le modifier  <span className='underline'>ici</span> 
                    </Link>
                </div>}
                <h1 className='text-2xl font-semibold text-gray-800'>{Fundraiser.title}</h1>
                <div className=" lg:w-4/6 xl:w-full mx-auto flex flex-nowrap items-start justify-between mt-5 h-screen">
                    <div className='w-full mr-8 overflow-hidden'>
                        <div className='w-full aspect-[7/4] flex items-center justify-center'>
                            {ShowMain.type == 'image' && <img className="max-h-full max-w-full max rounded-md object-cover object-center " src={Fundraiser.image ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${Fundraiser.image}` : "/3aweni_placeholder.png"} alt="content" /> }
                            {ShowMain.type == 'secondaryImages' && <img className="max-h-full max-w-full rounded-md object-cover object-center " src={`https://res.cloudinary.com/dhwfr0ywo/image/upload/${Fundraiser.secondaryImages[ShowMain.index]}`} alt="content" /> }
                            {ShowMain.type == 'secondaryVideos' &&
                                <video className='relative w-full rounded-md overflow-hidden flex items-center justify-center' controls autoPlay muted> 
										<source  className="object-cover object-center max-h-full max-w-full rounded-md" src={`https://res.cloudinary.com/dhwfr0ywo/video/upload/${Fundraiser.secondaryVideos[ShowMain.index]}`} />
                                </video> }

                        </div>
                        {Fundraiser.secondaryImages.length && Fundraiser.secondaryVideos.length ? 
                        <div className='relative w-full flex items-center flex-nowrap'>
                            <button className='absolute top-1/2 -translate-y-1/2 left-0 shrink-0 z-10' onClick={handleScrollLeftCarousel}>
                                <IconContext.Provider value={{ className: 'h-8 w-8 text-primary'}}>
                                    <IoIosArrowBack />
                                </IconContext.Provider>
                            </button>
                            <div ref={carousel} className='w-full max-w-full flex justify-start items-center flex-nowrap my-5 gap-5 overflow-x-auto hidden-scrollbar scroll-smooth'>
                                <button className='relative max-w-[224px] h-32 rounded-md overflow-hidden flex items-center justify-center shrink-0' onClick={() => setShowMain({type: 'image', index: 0})}>
                                    <img className="object-cover object-center max-w-full max-h-full self-center rounded-md" src={`https://res.cloudinary.com/dhwfr0ywo/image/upload/${Fundraiser.image}`} alt="content" />
                                </button>
                                {Fundraiser.secondaryImages.map((item,index) => 
                                <button className='relative max-w-[224px] h-32 rounded-md overflow-hidden flex items-center justify-center shrink-0' onClick={() => setShowMain({type: 'secondaryImages', index: index})}>
                                    <img className="object-cover object-center max-w-full max-h-full self-center rounded-md" src={`https://res.cloudinary.com/dhwfr0ywo/image/upload/${item}`} alt="content" />
                                </button> )}
                                {Fundraiser.secondaryVideos.map((item,index) => 
                                <button className='w-fit h-fit rounded-md shrink-0' onClick={() => setShowMain({type: 'secondaryVideos', index: index})}>
                                <video className='relative max-w-[224px] h-32 rounded-md overflow-hidden flex items-center justify-center'> 
										<source  className="object-cover object-center max-h-full max-w-full rounded-md" src={`https://res.cloudinary.com/dhwfr0ywo/video/upload/${item}`} />
                                </video>
                                </button>
                                 )}
                            </div>
                            <button className='absolute top-1/2 -translate-y-1/2 right-0 z-10' onClick={handleScrollRightCarousel}>
                                <IconContext.Provider value={{ className: 'h-8 w-8 text-primary'}}>
                                    <IoIosArrowForward />
                                </IconContext.Provider>
                            </button>
                        </div>
                            :
                        null}


                        <div className="w-full px-8 py-6 sm:flex justify-between sm:space-x-6 border-y border-secondary/50">
                            <div className='flex space-x-6'>

                                <div className="flex-shrink-0 w-16 mb-6 h-16 sm:h-16 sm:w-16 sm:mb-0">
                                    <img src="https://source.unsplash.com/100x100/?portrait?1" alt="" className="object-cover object-center w-full h-full rounded-full" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-secondary">Leroy Jenkins</h2>
                                    <p className='text-sm text-zinc-600'>Organisateur</p>
                                </div>
                            </div>
                            <button className='border rounded px-2 py-0.5 border-secondary text-secondary self-center'>Contacter</button>
                        </div>
                        

                        <p className='my-5'>{Fundraiser.description}</p>

                        <div className='flex gap-3 items-center'>
                                <button className="w-full text-white py-2.5 rounded-lg my-3 flex flex-nowrap items-center gap-2 justify-center shadow-form bg-secondary hover:-translate-y-1 transition-all">
                                    Donate
                                </button>
                                <button className="h-fit border border-secondary text-secondary w-full py-[9px] rounded-lg flex justify-center items-center flex-nowrap gap-1">
                                    <IconContext.Provider value={{ className: 'text-secondary h-4 w-4 mb-0.5'}}>
                                        <MdIosShare />
                                    </IconContext.Provider>
                                    <span>Partager</span>
                                </button>
                        </div>
                        
                    </div>
                    <div className='relative fundraiser-sidebar'>

                        <div className="sticky card w-fit bg-base-100 shadow-modern rounded-lg px-4 top-24">
                            <div className="w-72 py-8 flex flex-col">
                                <p className='text-zinc-700 font-thin text-xs'> <strong className='text-black font-semibold text-lg'>123.00DT </strong> collectés men asl {Fundraiser.goal}.00DT</p>
                                <progress max="100" value={30} className="w-full h-2 my-1 overflow-hidden rounded bg-secondary/10 [&::-webkit-progress-bar]:bg-secondary/10 [&::-webkit-progress-value]:bg-secondary [&::-moz-progress-bar]:bg-secondary" />
                                <p className='text-zinc-500 font-thin text-xs'>11.2k dons</p>




                            <div className="rounded-2xl bg-white p-4">
                                <div className="flex-row gap-4 flex justify-start items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#" className="relative block">
                                            <img alt="profil" src="/profile.png" className="mx-auto object-cover rounded-full h-9 w-9 "/>
                                        </a>
                                    </div>
                                    <div className=" flex flex-col">
                                        <span className="text-sm font-medium text-gray-700">
                                            Charlie
                                        </span>
                                        <div className="text-xs flex flex-nowrap items-center">
                                            <p className=' font-bold'>50 TND &nbsp;</p>   -  &nbsp;
                                            <button className='hover:underline text-black'>
                                                Top donation
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr/>

                            <div className="rounded-2xl bg-white p-4">
                                <div className="flex-row gap-4 flex justify-start items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#" className="relative block">
                                            <img alt="profil" src="/profile.png" className="mx-auto object-cover rounded-full h-9 w-9 "/>
                                        </a>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-700">
                                            Charlie
                                        </span>
                                        <div className="text-xs flex flex-nowrap items-center">
                                            <p className=' font-bold'>50 TND &nbsp;</p>   -  &nbsp;
                                            <button className='hover:underline text-black'>
                                                Recent donation
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr/>

                            
                            <div className="rounded-2xl bg-white p-4">
                                <div className="flex-row gap-4 flex justify-start items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#" className="relative block">
                                            <img alt="profil" src="/profile.png" className="mx-auto object-cover rounded-full h-9 w-9 "/>
                                        </a>
                                    </div>
                                    <div className=" flex flex-col">
                                        <span className="text-sm font-medium text-gray-700">
                                            Charlie
                                        </span>
                                        <div className="text-xs flex flex-nowrap items-center">
                                            <p className=' font-bold'>50 TND &nbsp;</p>   -  &nbsp;
                                            <button className='hover:underline text-black'>
                                                First donation
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                                <button className="text-gray-700 underline w-fit self-center py-1 rounded-lg text-sm">Voir tous</button>

                                <button className="w-full text-white py-2.5 rounded-lg my-3 flex flex-nowrap items-center gap-2 justify-center shadow-form bg-secondary hover:-translate-y-1 transition-all">
                                    Donate
                                </button>
                                <button className="h-9 border border-secondary text-secondary w-full py-1.5 rounded-lg flex justify-center items-center flex-nowrap gap-1">
                                    <IconContext.Provider value={{ className: 'text-secondary h-4 w-4 mb-0.5'}}>
                                        <MdIosShare />
                                    </IconContext.Provider>
                                    <span>Partager</span>
                                </button>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </main>
  )
}
