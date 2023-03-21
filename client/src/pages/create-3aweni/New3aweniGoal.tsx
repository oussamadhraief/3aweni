import { Input } from '@material-tailwind/react';
import { FormEvent, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FcMoneyTransfer } from 'react-icons/fc';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

interface FormState {
  category: string;
  state: string | undefined;
  zipCode: number | undefined;
  type: string;
  goal: string | undefined;
}


export default function New3aweniGoal() {

  const navigate = useNavigate()

  const [Form, setForm] = useState<FormState>({category: '', state: "", zipCode: undefined, type: '', goal: undefined})

  useEffect(() => {
    const session3aweni = sessionStorage.getItem('create3aweni')
    if (session3aweni) {
      
      const res = JSON.parse(session3aweni)

      if(res.zipCode && res.state && res.category && res.type)
        setForm(JSON.parse(session3aweni))
      else 
        navigate('/create/category')

    }
    else {
      navigate('/create/category')
    }
  }, []);

    const handleChange = (e: FormEvent) => {
  
      const target = e.target as HTMLInputElement

      setForm({
        ...Form,
        goal: target.value
      })
      

    }

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault()
  
      sessionStorage.setItem('create3aweni',JSON.stringify(Form))
      
      navigate('/create/register')
      
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
            <Input label="Objectif en TND" type='number' name="goal" id="goal" required value={Form.goal} onChange={handleChange} icon={<FcMoneyTransfer />} />
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
          <button className='w-fit h-fit px-6 py-3 bg-main_color rounded shadow-form text-white flex items-center font-medium gap-1 self-end'> Suivant</button>
          </div>
      </div> 

    </form>
    </main>

  )
}
