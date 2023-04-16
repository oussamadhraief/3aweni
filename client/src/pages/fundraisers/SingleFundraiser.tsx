import axios from 'axios'
import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { MdIosShare } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { fundraiserInt } from '../../utils/interfaces'
import { AiFillWarning } from 'react-icons/ai'
import useAuthContext from '../../hooks/useAuthContext'


export default function SingleFundraiser() {

    const { id } = useParams()
    const { user } = useAuthContext()

    const [Fundraiser, setFundraiser] = useState<fundraiserInt>({_id: "", category: "", state: "", zipCode: 0, type: "", goal: undefined, user: '', image: null, title: '' })
    const [WarningOpen, setWarningOpen] = useState<boolean>(true)

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

  return (
    <main className='relative mt-[94px] py-24  flex flex-col items-center justify-center'>
            <section className="w-full max-w-6xl mx-auto flex flex-col text-gray-600 px-5">
                {(user?._id === Fundraiser.user && WarningOpen) && <div className='fixed bottom-0 left-0 bg-lighter_main_color/80 w-full flex justify-between items-center py-3 px-10 text-main_color'>
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
                    <Link to={`/account/dashboard/fundraisers/${Fundraiser._id}`} className='text-sm text-main_color border border-main_color px-2 py-1 rounded'>
                        Vous pouvez le modifier  <span className='underline'>ici</span> 
                    </Link>
                </div>}
                <h1 className='text-2xl font-semibold text-gray-800'>{Fundraiser.title}</h1>
                <div className=" lg:w-4/6 xl:w-full mx-auto flex flex-nowrap items-start justify-between mt-5 h-screen">
                    <div className='w-full mr-8'>
                        <img className="w-full rounded object-cover object-center " src="/3aweni_placeholder.png" alt="content" />

                    </div>
                    <div className='relative fundraiser-sidebar'>

                        <div className="sticky card w-fit bg-base-100 shadow-modern rounded-lg px-4 top-24 ">
                            <div className="card-body w-72 py-3">
                                <p className='text-zinc-700 font-thin text-xs'> <strong className='text-black font-semibold text-lg'>52.000 TND</strong> collectés men asl {Fundraiser.goal}.00DT</p>
                                <progress max="100" value="25" className="w-full h-2 my-1 overflow-hidden rounded bg-secondary_color/10 [&::-webkit-progress-bar]:bg-secondary_color/10 [&::-webkit-progress-value]:bg-secondary_color [&::-moz-progress-bar]:bg-secondary_color" />
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
                                    <div className=" flex flex-col">
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

                                <button className="text-gray-700 underline w-20 mx-auto py-1 rounded-lg text-sm">Voir tous</button>

                                <button className="w-full text-white py-2.5 rounded-lg my-3 flex flex-nowrap items-center gap-2 justify-center shadow-form donate-button">
                                    Donate
                                </button>
                                <button className="h-9 border border-main_color text-main_color w-full py-1.5 rounded-lg flex justify-center items-center flex-nowrap gap-1">
                                    <IconContext.Provider value={{ className: 'text-main_color h-4 w-4 mb-0.5'}}>
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
