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

        const value = target.type === 'checkbox' ? target.checked : target.value

        setFilters({
            ...Filters,
            [target.name]: value
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
                        
                        <select  className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50 outline-none" name="category" value={Filters.category} onChange={handleFiltersChange}>
                            <option value="" selected>Aucune catégorie selectionnée</option>

                            <option value="Animaux"> 
                                Animaux
                            </option>

                            <option value="Bénévolat"> 
                            Bénévolat 
                            </option>

                            <option value="Communauté"> 
                            Communauté 
                            </option>

                            <option value="Compétition"> 
                            Compétition 
                            </option>
                        
                            <option value="Créativité"> 
                            Créativité 
                            </option>

                            <option value="Dépensescourantes"> Dépenses-courantes 
                            </option>

                            <option value="Éducation"> 
                            Éducation 
                            </option>

                            <option value="Entreprises"> 
                            Entreprises 
                            </option>

                            <option value="Environnement"> 
                            Environnement 
                            </option>

                            <option value="Événements"> 
                            Événements 
                            </option>

                            <option value="Famille"> 
                            Famille 
                            </option>
                        
                            <option value="Obsèquesetcommémorations"> Obsèques et commémorations
                            </option>

                            <option value="PotscommunsdAnniversaire"> Pots communs d'Anniversaire 
                            </option>

                            <option value="Religion">
                            Religion 
                            </option>

                            <option value="Rêves"> 
                            Rêves 
                            </option>

                            <option value="Santé"> 
                            Santé 
                            </option>

                            <option value="Sports"> 
                            Sports 
                            </option>

                            <option value="Urgences"> 
                            Urgences 
                            </option>

                            <option value="Voyages"> 
                            Voyages 
                            </option>

                            <option value="Autre"> 
                            Autre
                            </option>
                            
                        </select>
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
