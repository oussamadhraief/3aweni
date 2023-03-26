import { FormEvent, useState } from 'react'
import { IconContext } from 'react-icons'
import { GoSettings } from 'react-icons/go'
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import SearchPageSuggestions from '../../components/SearchPageSuggestions'

interface FiltersInterface {
    nearby: boolean;
    closeToGoal: boolean;
    category: string;
}

export default function SearchField() {

    const [Search, setSearch] = useState<string>('')
    const [Open, setOpen] = useState<boolean>(false)
    const [Filters, setFilters] = useState<FiltersInterface>({nearby: false, closeToGoal: false, category: ""})


    const handleChange = (e: FormEvent) => {

        const target = e.target as HTMLInputElement

        setSearch(target.value)
    }

    const handleFiltersChange = (e: FormEvent) => {

        const target = e.target as HTMLInputElement


        setFilters({
            ...Filters,
            [target.name]: target.value
        })

    }

    const handleFiltersReset = () => {
        setFilters({nearby: false, closeToGoal: false, category: ""})
        setOpen(false)
    }


  return (
    <main className='mt-[94px] py-24  flex flex-col items-center justify-center'>
        <form className="relative w-1/3 rounded-full border border-gray-400 flex items-center pr-3 overflow-hidden mb-14">
            <button className='px-2 h-10 flex justify-center items-center outline-none' >
                <IconContext.Provider value={{ className: 'rotate-90 h-6 w-6 text-sm text-gray-600'}}>
                    <AiOutlineSearch />
                </IconContext.Provider>
            </button>
            <input placeholder="Chercher un 3aweni" className='w-full outline-none h-10 placeholder:text-sm placeholder:font-thin placeholder:text-gray-600' value={Search} onChange={handleChange} />
            <button type='button' className="rounded bg-gray-200 px-3 py-1 flex items-center gap-1" onClick={() => setOpen(true)}>
                
                Filters
                <IconContext.Provider value={{ className: 'rotate-90 h-4 w-4 text-sm'}}>
                    <GoSettings />
                </IconContext.Provider>
            </button>
        </form>

        {
        Open &&
            <div className='fixed inset-0 bg-gray-600/40 z-[100]' onClick={() => setOpen(false)}>
            </div>
        }

            <div className={Open ? 'w-72 fixed top-0 left-0 h-screen bg-white shadow-form z-[101] py-2  flex flex-col flex-nowrap justify-start transition-all duration-300  whitespace-nowrap' : "w-72  overflow-hidden fixed top-0 -left-80 h-screen bg-white shadow-form z-[101] flex flex-col flex-nowrap justify-start transition-all duration-300  whitespace-nowrap" }>
                <div className='w-full flex flex-nowrap justify-between items-center border-b border-gray-300 shrink-0 px-2 pb-2'>

                <h3 className='text-lg '>Filtres</h3>

                <button className='p-1.5 rounded-full hover:bg-gray-200' onClick={() => setOpen(false)}>
                    <IconContext.Provider value={{ className: 'h-5 w-5'}}>
                        <IoMdClose />
                    </IconContext.Provider>
                </button>
                
                
                </div>
                <div className='h-full overflow-auto py-5 px-3 flex flex-col items-start gap-5'>
                    <div className='flex items-center justify-start gap-5'>
                        <p>Près de vous</p>

                        

                        <label htmlFor="NearbyToggle" className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100">
                            <span className="relative">
                                <input id="NearbyToggle" type="checkbox"
                                name='nearby'
                                checked={Filters.nearby}
                                onChange={handleFiltersChange}
                                 className="hidden peer" />
                                <div className="w-11 h-6 rounded-full shadow-inner bg-gray-300 peer-checked:bg-secondary_color"></div>
                                <div className="bg-white absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow  peer-checked:left-5 transition-all duration-200 ease-in-out"></div>
                            </span>
                        </label>
                        
                    </div>
                    <div className='flex items-center justify-start gap-5'>
                        <p>Close to goal</p>
                        <label htmlFor="CloseToGoalToggle" className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100">
                            <span className="relative">
                                <input id="CloseToGoalToggle" type="checkbox"
                                name='closeToGoal'
                                checked={Filters.closeToGoal}
                                onChange={handleFiltersChange}
                                 className="hidden peer" />
                                <div className="w-11 h-6 rounded-full shadow-inner bg-gray-300 peer-checked:bg-secondary_color"></div>
                                <div className="bg-white absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow  peer-checked:left-5 transition-all duration-200 ease-in-out"></div>
                            </span>
                        </label>
                    </div>
                    <div className='mt-5 w-full'>

                        <p>Categorie</p>
                        
                            
                        <div className='flex flex-wrap justify-start gap-3 mt-1'>

                            <label className={Filters.category == "Bénévolat" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Bénévolat"> <input type="checkbox" name="category" id="Bénévolat" className='sr-only' onChange={handleFiltersChange} required value="Bénévolat" checked={Filters.category === "Bénévolat"} /> Bénévolat</label> 
                        
                            <label className={Filters.category == "Communauté" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Communauté"> <input type="checkbox" name="category" id="Communauté" className='sr-only' onChange={handleFiltersChange} required value="Communauté" checked={Filters.category === "Communauté"} /> Communauté</label> 
                        
                            <label className={Filters.category == "Compétition" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Compétition"> <input type="checkbox" name="category" id="Compétition" className='sr-only' onChange={handleFiltersChange} required value="Compétition" checked={Filters.category === "Compétition"} /> Compétition</label> 
                        
                            <label className={Filters.category == "Créativité" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Créativité"> <input type="checkbox" name="category" id="Créativité" className='sr-only' onChange={handleFiltersChange} required value="Créativité" checked={Filters.category === "Créativité"} /> Créativité</label> 
                        
                            <label className={Filters.category == "Dépensescourantes" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Dépenses-courantes"> <input type="checkbox" name="category" id="Dépenses-courantes" className='sr-only' onChange={handleFiltersChange} required value="Dépensescourantes" checked={Filters.category === "Dépensescourantes"} /> Dépenses courantes</label> 
                        
                            <label className={Filters.category == "Éducation" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Éducation"> <input type="checkbox" name="category" id="Éducation" className='sr-only' onChange={handleFiltersChange} required value="Éducation" checked={Filters.category === "Éducation"} /> Éducation</label> 
                        
                            <label className={Filters.category == "Entreprises" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Entreprises"> <input type="checkbox" name="category" id="Entreprises" className='sr-only' onChange={handleFiltersChange} required value="Entreprises" checked={Filters.category === "Entreprises"} /> Entreprises</label> 
                        
                            <label className={Filters.category == "Environnement" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Environnement"> <input type="checkbox" name="category" id="Environnement" className='sr-only' onChange={handleFiltersChange} required value="Environnement" checked={Filters.category === "Environnement"} /> Environnement</label> 
                        
                            <label className={Filters.category == "Événements" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Événements"> <input type="checkbox" name="category" id="Événements" className='sr-only' onChange={handleFiltersChange} required value="Événements" checked={Filters.category === "Événements"} /> Événements</label> 
                        
                            <label className={Filters.category == "Famille" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Famille"> <input type="checkbox" name="category" id="Famille" className='sr-only' onChange={handleFiltersChange} required value="Famille" checked={Filters.category === "Famille"} /> Famille</label> 
                        
                        
                            <label className={Filters.category == "Obsèquesetcommémorations" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Obsèques-commémorations"> <input type="checkbox" name="category" id="Obsèques-commémorations" className='sr-only' onChange={handleFiltersChange} required value="Obsèquesetcommémorations" checked={Filters.category === "Obsèquesetcommémorations"} /> Obsèques et commémorations</label> 
                        
                            <label className={Filters.category == "PotscommunsdAnniversaire" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="anniversaire"> <input type="checkbox" name="category" id="anniversaire" className='sr-only' onChange={handleFiltersChange} required value="PotscommunsdAnniversaire" checked={Filters.category === "PotscommunsdAnniversaire"} /> Pots communs d'Anniversaire</label> 
                        
                            <label className={Filters.category == "Religion" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Religion"> <input type="checkbox" name="category" id="Religion" className='sr-only' onChange={handleFiltersChange} required value="Religion" checked={Filters.category === "Religion"} /> Religion</label> 
                        
                            <label className={Filters.category == "Rêves" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Rêves"> <input type="checkbox" name="category" id="Rêves" className='sr-only' onChange={handleFiltersChange} required value="Rêves" checked={Filters.category === "Rêves"} /> Rêves</label> 
                        
                            <label className={Filters.category == "Santé" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Santé"> <input type="checkbox" name="category" id="Santé" className='sr-only' onChange={handleFiltersChange} required value="Santé" checked={Filters.category === "Santé"} /> Santé</label> 
                        
                            <label className={Filters.category == "Sports" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Sports"> <input type="checkbox" name="category" id="Sports" className='sr-only' onChange={handleFiltersChange} required value="Sports" checked={Filters.category === "Sports"} /> Sports</label> 
                        
                            <label className={Filters.category == "Urgences" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Urgences"> <input type="checkbox" name="category" id="Urgences" className='sr-only' onChange={handleFiltersChange} required value="Urgences" checked={Filters.category === "Urgences"} /> Urgences</label> 
                        
                            <label className={Filters.category == "Voyages" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Voyages"> <input type="checkbox" name="category" id="Voyages" className='sr-only' onChange={handleFiltersChange} required value="Voyages" checked={Filters.category === "Voyages"} /> Voyages</label> 
                        
                            <label className={Filters.category == "Autre" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Autre"> <input type="checkbox" name="category" id="Autre" className='sr-only' onChange={handleFiltersChange} required value="Autre" checked={Filters.category === "Autre"} /> Autre</label> 
                    </div>
                    </div>
                    
                </div>
                <div className='w-full flex flex-nowrap items-center justify-around shrink-0 pt-3 px-3'>
                <button className='border rounded-2xl border-gray-500 px-4 py-2' onClick={handleFiltersReset}>Restaurer</button>

                <button onClick={() => setOpen(false)} className='border rounded-2xl border-main_color px-4 py-2 bg-main_color text-white'>Voir résultats</button>
                </div>
            </div>
        
        <div className='w-full  flex flex-col items-center justify-center'>

            <SearchPageSuggestions />
        </div>

    </main>
  )
}
