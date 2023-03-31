import { FormEvent, useState, useEffect } from 'react'
import { states } from '../../utils/statesData'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

interface FormState {
  category: string;
  state: string;
  zipCode: number;
  type: string;
  goal: number;
}


export default function New3aweniCategoryLocation() {

  const navigate = useNavigate()

  const [Form, setForm] = useState<FormState>({category: '', state: "", zipCode: 0, type: '', goal: 0})
  


  useEffect(() => {
    const session3aweni = sessionStorage.getItem('create3aweni')
    if (session3aweni) {
      const res = JSON.parse(session3aweni)
      if(res.category && res.state && res.zipCode)
        
        setForm({
          ...res,
          zipCode: parseInt(res.zipCode)
        })

  }
  }, []);

  const handleChange = (e: FormEvent) => {

    const target = e.target as HTMLInputElement
    
    setForm({
      ...Form,
      [target.name]: target.value
    })

  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    sessionStorage.setItem('create3aweni',JSON.stringify(Form))
    console.log(Form);
    
    
    navigate('/create/type')
    
  }
    
  return (
    <main  className='relative w-screen h-screen min-w-screen min-h-screen overflow-visible flex flex-nowrap items-start bg-beige'>
      <Link to='/' className='w-14 absolute left-10 top-10 z-50'> 
            <img src="/icon.png" alt="" />
        </Link>
      
      <form onSubmit={handleSubmit} className='w-screen h-fit min-w-screen min-h-screen overflow-hidden items-start relative flex flex-nowrap shrink-0'>

        <aside className='w-1/3 h-screen  bg-beige create-aside-background relative flex justify-center'>
            
            <h1 className='mt-[25vh]'>
              <strong>Etape 1: </strong> Choisissez une catégorie et entrez votre localisation
            </h1>
        </aside>
        <div className='w-2/3 h-screen bg-white z-10 rounded-tl-[46px] shadow-modern px-10 pb-10 overflow-auto pt-32 flex items-center flex-col justify-between'>
        <div className='w-5/6 '>
        
            <p>Selectionnez une catégorie:</p> 
            <div className='flex justify-start gap-4 items-center flex-wrap mt-8'>
        
            <label className={Form.category == "Animaux" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="animals"> <input type="radio" name="category" id="animals" className='sr-only' onChange={e => handleChange(e)} required value="Animaux" checked={Form.category === "Animaux"} /> Animaux</label> 
        
            <label className={Form.category == "Bénévolat" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Bénévolat"> <input type="radio" name="category" id="Bénévolat" className='sr-only' onChange={e => handleChange(e)} required value="Bénévolat" checked={Form.category === "Bénévolat"} /> Bénévolat</label> 
        
            <label className={Form.category == "Communauté" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Communauté"> <input type="radio" name="category" id="Communauté" className='sr-only' onChange={e => handleChange(e)} required value="Communauté" checked={Form.category === "Communauté"} /> Communauté</label> 
        
            <label className={Form.category == "Compétition" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Compétition"> <input type="radio" name="category" id="Compétition" className='sr-only' onChange={e => handleChange(e)} required value="Compétition" checked={Form.category === "Compétition"} /> Compétition</label> 
        
            <label className={Form.category == "Créativité" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Créativité"> <input type="radio" name="category" id="Créativité" className='sr-only' onChange={e => handleChange(e)} required value="Créativité" checked={Form.category === "Créativité"} /> Créativité</label> 
        
            <label className={Form.category == "Dépensescourantes" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Dépenses-courantes"> <input type="radio" name="category" id="Dépenses-courantes" className='sr-only' onChange={e => handleChange(e)} required value="Dépensescourantes" checked={Form.category === "Dépensescourantes"} /> Dépenses courantes</label> 
        
            <label className={Form.category == "Éducation" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Éducation"> <input type="radio" name="category" id="Éducation" className='sr-only' onChange={e => handleChange(e)} required value="Éducation" checked={Form.category === "Éducation"} /> Éducation</label> 
        
            <label className={Form.category == "Entreprises" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Entreprises"> <input type="radio" name="category" id="Entreprises" className='sr-only' onChange={e => handleChange(e)} required value="Entreprises" checked={Form.category === "Entreprises"} /> Entreprises</label> 
        
            <label className={Form.category == "Environnement" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Environnement"> <input type="radio" name="category" id="Environnement" className='sr-only' onChange={e => handleChange(e)} required value="Environnement" checked={Form.category === "Environnement"} /> Environnement</label> 
        
            <label className={Form.category == "Événements" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Événements"> <input type="radio" name="category" id="Événements" className='sr-only' onChange={e => handleChange(e)} required value="Événements" checked={Form.category === "Événements"} /> Événements</label> 
        
            <label className={Form.category == "Famille" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Famille"> <input type="radio" name="category" id="Famille" className='sr-only' onChange={e => handleChange(e)} required value="Famille" checked={Form.category === "Famille"} /> Famille</label> 
        
        
            <label className={Form.category == "Obsèquesetcommémorations" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Obsèques-commémorations"> <input type="radio" name="category" id="Obsèques-commémorations" className='sr-only' onChange={e => handleChange(e)} required value="Obsèquesetcommémorations" checked={Form.category === "Obsèquesetcommémorations"} /> Obsèques et commémorations</label> 
        
            <label className={Form.category == "PotscommunsdAnniversaire" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="anniversaire"> <input type="radio" name="category" id="anniversaire" className='sr-only' onChange={e => handleChange(e)} required value="PotscommunsdAnniversaire" checked={Form.category === "PotscommunsdAnniversaire"} /> Pots communs d'Anniversaire</label> 
        
            <label className={Form.category == "Religion" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Religion"> <input type="radio" name="category" id="Religion" className='sr-only' onChange={e => handleChange(e)} required value="Religion" checked={Form.category === "Religion"} /> Religion</label> 
        
            <label className={Form.category == "Rêves" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Rêves"> <input type="radio" name="category" id="Rêves" className='sr-only' onChange={e => handleChange(e)} required value="Rêves" checked={Form.category === "Rêves"} /> Rêves</label> 
        
            <label className={Form.category == "Santé" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Santé"> <input type="radio" name="category" id="Santé" className='sr-only' onChange={e => handleChange(e)} required value="Santé" checked={Form.category === "Santé"} /> Santé</label> 
        
            <label className={Form.category == "Sports" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Sports"> <input type="radio" name="category" id="Sports" className='sr-only' onChange={e => handleChange(e)} required value="Sports" checked={Form.category === "Sports"} /> Sports</label> 
        
            <label className={Form.category == "Urgences" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Urgences"> <input type="radio" name="category" id="Urgences" className='sr-only' onChange={e => handleChange(e)} required value="Urgences" checked={Form.category === "Urgences"} /> Urgences</label> 
        
            <label className={Form.category == "Voyages" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Voyages"> <input type="radio" name="category" id="Voyages" className='sr-only' onChange={e => handleChange(e)} required value="Voyages" checked={Form.category === "Voyages"} /> Voyages</label> 
        
            <label className={Form.category == "Autre" ? 'relative px-4 py-2 text-sm bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-full select-none' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color text-sm hover:border-lighter_main_color hover:cursor-pointer rounded-full select-none border border-white'} htmlFor="Autre"> <input type="radio" name="category" id="Autre" className='sr-only' onChange={e => handleChange(e)} required value="Autre" checked={Form.category === "Autre"} /> Autre</label> 
        
        
            </div>
          </div>
          <div className='w-5/6'>
            <h3>Insérez vos coordonnées:</h3>
            <div className="w-full h-fit flex flex-nowrap justify-start items-start gap-5 mt-3">
              <div className='w-1/3'>

              <select  className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50 outline-none" onChange={handleChange} required name='state' value={Form.state}>
                <option>Selectionnez un state</option>
                {states.map(item => <option key={item.label} value={item.label}>{item.label}</option>)}
              </select>


              </div>

              <div className="relative w-full xl:w-96">
                <input type="number" className="peer block w-full h-10 bg-transparent border  border-[#ccc] transition-all px-[15px] outline-none z-0 focus:border-main_color valid:border-main_color rounded-lg" name="zipCode" id='zipCode' required value={Form.zipCode || ''} onChange={handleChange} />
                <label htmlFor="zipCode" className="absolute peer-focus:text-xs peer-focus:-top-[7px] peer-focus:outline-none bg-white peer-focus:text-main_color border-0 outline-none peer-valid:text-main_color peer-valid:text-xs peer-valid:-top-[7px] peer-valid:outline-none cursor-text z-10 top-[11px] left-2 text-sm font-medium px-[2px] text-[rgb(80,80,80)] transition-all">Code zip</label>
            </div>
              
              
            </div>
          </div>
        
            <button  className='w-fit h-fit px-6 py-3 bg-main_color rounded shadow-form text-white flex items-center font-medium gap-1 self-end'> Suivant </button>
        </div>  
    </form>
    </main>
  )
}
