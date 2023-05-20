import { FormEvent, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { useAuthContext } from '../../contexts/AuthContext';
import axios from '../../utils/axiosConfig';
import CurrencyInput from 'react-currency-input-field';

interface FormState {
  category: string;
  state: string;
  zipCode: number;
  type: string;
  title: string;
  goal: string;
}


export default function New3aweniTitleGoal() {

  const { user } = useAuthContext()
  const navigate = useNavigate()

  const [Form, setForm] = useState<FormState>({category: '', state: "", zipCode: 0, type: '', title: '', goal: ''})

  useEffect(() => {
    const session3aweni = sessionStorage.getItem('create3aweni')
    if (session3aweni) {
      
      const res = JSON.parse(session3aweni)

      if(res.zipCode && res.state && res.category && res.type)
      
        setForm(res)
      else 
        navigate('/create/category')

    }
    else {
      navigate('/create/category')
    }
  }, []);

    

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault()
      
      if(user){
        
          const goal = parseFloat(Form.goal.replace(/,/g, ''))
          axios.post('/api/create-fundraiser',{
            ...Form,
            goal
          },{
            withCredentials: true
          }).then((response) => {

            // localStorage.removeItem('create3aweni')

            
            const { data: { fundraiser } } = response
            

            navigate(`/fundraisers/${fundraiser._id}`)

          }).catch(error => {

            console.log(error);
            
          })
      }else{
          sessionStorage.setItem('create3aweni',JSON.stringify(Form))
          navigate('/create/register')
        }
        
      
    }


  return (
    <main  className='relative w-screen h-screen min-w-screen min-h-screen overflow-visible flex flex-nowrap items-start bg-beige'>
      <Link to='/' className='w-14 absolute left-10 top-10 z-50'> 
          <img src="/icon.png" alt="" />
      </Link>
      
      <form onSubmit={handleSubmit} className='w-screen h-fit min-w-screen min-h-screen overflow-hidden items-start relative flex flex-nowrap shrink-0'>


  <aside className='w-1/3 h-screen bg-beige create-aside-background relative flex flex-col items-center'>
          
          <h2 className='mt-[25vh]'>
            <strong>Etape 3: </strong> Insérez l'objectif de votre 3aweni.
          </h2>
          {/* <p className='text-gray-700 text-sm'>Vous pouvez toujours modifier l'objectif (jsp).</p> */}
      </aside> 
    
      <div className='w-2/3 h-screen bg-white z-10 rounded-tl-[46px] shadow-modern px-10 pb-10 overflow-auto pt-32 flex items-center flex-col justify-between'>
        <div onSubmit={handleSubmit} className='w-3/6 mt-20'>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Choisissez un titre</span>
          </label>
          <label className="label">
            <input type="text" name="title" id="title" required value={Form.title || ''} onChange={e => setForm({
            ...Form,
            title: e.target.value
          })} placeholder="En mémoire de.." className="px-1 border-[#ccc] placeholder:text-sm placeholder:text-zinc-400 w-full outline-none border h-10 rounded-lg" />
          </label>

          <label className="label mt-10">
            <span className="label-text">Objectif de la collecte</span>
          </label>
          <label className="input-group">
            <CurrencyInput
            id="input-example"
            name="input-name"
            placeholder="1,000,000"
            defaultValue={''}
            decimalsLimit={2}
            maxLength={7}
            allowNegativeValue={false}
            value={Form.goal}
            onValueChange={(value) => {
              const newValue = value as string
              setForm({
              ...Form,
              goal: newValue
            })}}
            className='w-full outline-none border-y border-l h-10 px-1 border-[#ccc] placeholder:text-sm placeholder:text-zinc-400'
           />
            <span> TND</span>
          </label>
        </div>
            <div className='hidden'>
            </div>
            <p className='text-gray-700 text-xs mt-3'>Gardez à l'esprit que les frais de transaction, y compris les frais de crédit et de débit, sont déduits de chaque don.</p>
            <p className='bg-gray-200 text-gray-800 text-sm mt-5 rounded-2xl py-4 px-4'>Pour recevoir l'argent collecté, veuillez vous assurer que la personne qui effectue le retrait a : <br/><br/>
              <ul>
                <li>Un numéro de sécurité sociale américain</li>
                <li>Un compte bancaire et une adresse postale dans l'un des 50 États</li>
              </ul>
            </p>
        </div>
          <div className='w-full flex justify-between items-center'>

            <Link to="/create/type" className='font-medium'> 
            <IconContext.Provider value={{className: " text-gray-700 h-6 w-6"}}>
                    <HiOutlineArrowNarrowLeft /> 
            </IconContext.Provider>
          </Link>
          <button className='w-fit h-fit px-6 py-3 bg-primary rounded shadow-form text-white flex items-center font-medium gap-1 self-end'> Suivant</button>
          </div>
      </div> 

    </form>
    </main>

  )
}
