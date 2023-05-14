import { FormEvent, useState, useEffect } from 'react'
import { states } from '../../utils/statesData'
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import useAuthContext from '../../hooks/useAuthContext';
import useLoadingAuthContext from '../../hooks/useLoadingAuthContext';
import { categories } from '../../utils/categoriesData';
import getUser from '../../hooks/getUser';

interface FormState {
  category: string;
  state: string;
  zipCode: number;
  type: string;
  title: string;
  goal: string | undefined;
}


export default function New3aweniCategoryLocation() {

  const navigate = useNavigate()
  const location = useLocation()
  const { login, logout } = useAuthContext()
  const { setLoading } = useLoadingAuthContext()

  const [Form, setForm] = useState<FormState>({category: '', state: "", zipCode: 0, type: '', title: '', goal: undefined})
  
  useEffect(() => {

      getUser({ login, logout, setLoading })

  },[location])


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
        
            {categories.map(item => 
            <label className={`relative px-4 py-2 text-sm border ${Form.category == item.value ? "bg-lighter_primary border-primary" : "bg-white shadow-form hover:bg-lighter_primary hover:border-lighter_primary border-white"} hover:cursor-pointer rounded-full select-none`} htmlFor={item.value}> <input type="radio" name="category" id={item.value} className='sr-only' onChange={e => handleChange(e)} required value={item.value} checked={Form.category === item.value} /> {item.label} </label> 
            )}
        
        
            </div>
          </div>
          <div className='w-5/6'>
            <h3>Insérez vos coordonnées:</h3>
            <div className="w-full h-fit flex flex-nowrap justify-start items-start gap-5 mt-3">
              <div className='w-1/3'>

              <select  className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50 outline-none" onChange={handleChange} required name='state' value={Form.state}>
                <option>Selectionnez un state</option>
                {states.map(item => <option key={item.label} value={item.value}>{item.label}</option>)}
              </select>


              </div>

              <div className="relative w-full xl:w-96">
                <input type="number" className="peer block w-full h-10 bg-transparent border  border-[#ccc] transition-all px-[15px] outline-none z-0 focus:border-primary valid:border-primary rounded-lg" name="zipCode" id='zipCode' required value={Form.zipCode || ''} onChange={handleChange} />
                <label htmlFor="zipCode" className="absolute peer-focus:text-xs peer-focus:-top-[7px] peer-focus:outline-none bg-white peer-focus:text-primary border-0 outline-none peer-valid:text-primary peer-valid:text-xs peer-valid:-top-[7px] peer-valid:outline-none cursor-text z-10 top-[11px] left-2 text-sm font-medium px-[2px] text-[rgb(80,80,80)] transition-all">Code zip</label>
            </div>
              
              
            </div>
          </div>
        
            <button  className='w-fit h-fit px-6 py-3 bg-primary rounded shadow-form text-white flex items-center font-medium gap-1 self-end'> Suivant </button>
        </div>  
    </form>
    </main>
  )
}
