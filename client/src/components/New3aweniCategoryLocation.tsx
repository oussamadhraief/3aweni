import { FormEvent } from 'react'
import Select from 'react-select'
import { states } from '../utils/statesData'


interface FormState {
    category: string;
    state: string;
  }

  const styles = {
    menuList: (base: any) => ({
        ...base,
        height: "200px"
    }),
    control: (base: any) => ({
        ...base,
        height: 44,
        minHeight: 44
      }),
    option: (provided:any, state:any) => ({
    ...provided,
    outline: 'none',
    height: '40px',
    color: state.isSelected ? 'white' : 'black',
    background: state.isSelected ? '#F46752' : "#fff"
    })}

const themes = (theme:any) => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary: "#F46752"
    }})

export default function New3aweniCategoryGoal({handleChange, Form, setForm, handleScroll} : {handleChange:(e: FormEvent) => void, Form: FormState, setForm: React.Dispatch<React.SetStateAction<FormState>>, handleScroll: (index: number) => void}) {

    
  return (
    <div className='w-screen h-fit min-w-screen min-h-screen overflow-hidden items-start relative flex flex-nowrap shrink-0'>

      <aside className='w-1/3 h-screen  bg-[#f9f5f2] create-aside-background relative flex justify-center'>
          
          <h1 className='mt-[25vh]'>
            <strong>Etape 1: </strong> Choisissez une catégorie et entrez votre localisation
          </h1>
      </aside>
      <div className='w-2/3 h-screen bg-white z-10 rounded-l-[46px] shadow-modern px-10 pb-10 overflow-auto pt-32 flex items-start flex-col justify-between'>
        <div>
      
          <p>Selectionnez une catégorie:</p> 
          <div className='flex justify-start gap-4 items-center flex-wrap mt-8'>
      
          <label className={Form.category == "Animaux" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="animals"> <input type="radio" name="category" id="animals" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Animaux" checked={Form.category === "Animaux"} /> Animaux</label> 
      
          <label className={Form.category == "Bénévolat" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Bénévolat"> <input type="radio" name="category" id="Bénévolat" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Bénévolat" checked={Form.category === "Bénévolat"} /> Bénévolat</label> 
      
          <label className={Form.category == "Communauté" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Communauté"> <input type="radio" name="category" id="Communauté" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Communauté" checked={Form.category === "Communauté"} /> Communauté</label> 
      
          <label className={Form.category == "Compétition" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Compétition"> <input type="radio" name="category" id="Compétition" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Compétition" checked={Form.category === "Compétition"} /> Compétition</label> 
      
          <label className={Form.category == "Créativité" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Créativité"> <input type="radio" name="category" id="Créativité" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Créativité" checked={Form.category === "Créativité"} /> Créativité</label> 
      
          <label className={Form.category == "Dépensescourantes" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Dépenses-courantes"> <input type="radio" name="category" id="Dépenses-courantes" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Dépensescourantes" checked={Form.category === "Dépenses courantes"} /> Dépenses courantes</label> 
      
          <label className={Form.category == "Éducation" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Éducation"> <input type="radio" name="category" id="Éducation" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Éducation" checked={Form.category === "Éducation"} /> Éducation</label> 
      
          <label className={Form.category == "Entreprises" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Entreprises"> <input type="radio" name="category" id="Entreprises" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Entreprises" checked={Form.category === "Entreprises"} /> Entreprises</label> 
      
          <label className={Form.category == "Environnement" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Environnement"> <input type="radio" name="category" id="Environnement" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Environnement" checked={Form.category === "Environnement"} /> Environnement</label> 
      
          <label className={Form.category == "Événements" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Événements"> <input type="radio" name="category" id="Événements" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Événements" checked={Form.category === "Événements"} /> Événements</label> 
      
          <label className={Form.category == "Famille" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Famille"> <input type="radio" name="category" id="Famille" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Famille" checked={Form.category === "Famille"} /> Famille</label> 
      
          <label className={Form.category == "Mariage" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Mariage"> <input type="radio" name="category" id="Mariage" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Mariage" checked={Form.category === "Mariage"} /> Mariage</label> 
      
          <label className={Form.category == "Obsèquesetcommémorations" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Obsèques-commémorations"> <input type="radio" name="category" id="Obsèques-commémorations" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Obsèquesetcommémorations" checked={Form.category === "Obsèques et commémorations"} /> Obsèques et commémorations</label> 
      
          <label className={Form.category == "PotscommunsdAnniversaire" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="anniversaire"> <input type="radio" name="category" id="anniversaire" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="PotscommunsdAnniversaire" checked={Form.category === "Pots communs d'Anniversaire"} /> Pots communs d'Anniversaire</label> 
      
          <label className={Form.category == "Religion" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Religion"> <input type="radio" name="category" id="Religion" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Religion" checked={Form.category === "Religion"} /> Religion</label> 
      
          <label className={Form.category == "Rêves" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Rêves"> <input type="radio" name="category" id="Rêves" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Rêves" checked={Form.category === "Rêves"} /> Rêves</label> 
      
          <label className={Form.category == "Santé" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Santé"> <input type="radio" name="category" id="Santé" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Santé" checked={Form.category === "Santé"} /> Santé</label> 
      
          <label className={Form.category == "Sports" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Sports"> <input type="radio" name="category" id="Sports" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Sports" checked={Form.category === "Sports"} /> Sports</label> 
      
          <label className={Form.category == "Urgences" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Urgences"> <input type="radio" name="category" id="Urgences" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Urgences" checked={Form.category === "Urgences"} /> Urgences</label> 
      
          <label className={Form.category == "Voyages" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Voyages"> <input type="radio" name="category" id="Voyages" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Voyages" checked={Form.category === "Voyages"} /> Voyages</label> 
      
          <label className={Form.category == "Autre" ? 'relative px-4 py-2 bg-lighter_main_color border border-main_color hover:cursor-pointer rounded-lg' : 'relative px-4 py-2 bg-white shadow-form hover:bg-lighter_main_color hover:border-lighter_main_color hover:cursor-pointer rounded-lg border border-white'} htmlFor="Autre"> <input type="radio" name="category" id="Autre" className='absolute -z-10 rounded' onChange={e => handleChange(e)} required value="Autre" checked={Form.category === "Autre"} /> Autre</label> 
      
      
          </div>
        </div>
        <div className='w-3/6 '>
          <h3>Insérez vos coordonnées:</h3>
          <div className="w-full h-fit flex flex-nowrap justify-between items-end gap-5">
            
            <Select options={states} className='w-full mt-7 h-10 outline-none text-[13px] font-thin placeholder:text-zinc-300' value={Form.state} onChange={selectedValue => {
              
              if(selectedValue) {
                setForm({
                  ...Form,
                  state: selectedValue
                })}else{
                  setForm({
                    ...Form,
                    state: ''
                  })
                }
              }} 
              
              placeholder="State" 
              isClearable={true} 
              menuShouldScrollIntoView={true} 
              name="state" 
              styles={styles} 
              theme={themes} />

            <input type="number" placeholder='Code Zip' className='border h-11 -mb-1 px-1 border-light_gray rounded placeholder:text-xs placeholder:font-thin placeholder:text-[hsl(0,0%,50%)] outline-main_color' />
            
          </div>
        </div>
      
          <button type='button' onClick={e => handleScroll(1)} className='flex items-center font-medium gap-1 self-end'> Suivant <svg xmlns="http://www.w3.org/2000/svg" width="22.296" height="8.884" viewBox="0 0 30.296 14.884">
              <path id="Shape" d="M19.653,8.852c-.05-.622-.149-1.339,0-1.388a15.881,15.881,0,0,1,2.977-.717C15.087,5.55,7.543,4.4.049,3.253c-.148,0,.1-2.51,0-2.536C8.288,1.962,16.577,3.254,24.815,4.546c-.745-.671-1.539-1.292-2.283-1.962-.148-.144,0-1.1,0-1.292S22.68.143,22.531,0L27,3.875c.4.335.794.718,1.192,1.053.248.239.644.43.744.814a9.529,9.529,0,0,1,0,2.057v.478c0-.048-.049-.048-.049-.1-.1.335-.347.383-.894.479-.943.191-1.886.239-2.829.335a21.5,21.5,0,0,0-4.964.813.048.048,0,0,1-.049.049c-.149.048-.347.1-.5.143ZM.049.717h0Z" transform="matrix(0.985, -0.174, 0.174, 0.985, 0, 5.036)" fill="#000000"></path>
            </svg></button>
      </div>  
    </div>
  )
}
