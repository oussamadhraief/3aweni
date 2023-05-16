import axios from "axios"
import { useEffect, useState } from "react"
import { fundraiserInt } from "../../../utils/interfaces"
import { Link } from "react-router-dom"
import { IconContext } from "react-icons"
import { BiDotsVerticalRounded } from "react-icons/bi"


export default function DashboardFundraisers() {

  const [Fundraisers, setFundraisers] = useState<fundraiserInt[]>([])
  const [Loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    axios.get('/api/user/fundraisers', {
      withCredentials: true
    }).then((response) => {
      const { data: { fundraisers } } = response
      
      setFundraisers(fundraisers)
      setLoading(false)
      
    }).catch((error) => {
      console.log(error);
      setLoading(false)

    })
  },[])

  if (Loading) return null
    
  return (
    <main className="text-gray-600 bg-gray-50 dashboard-main-section">
    {Fundraisers.length ? 
    <div className="container px-5 py-24 mx-auto bg-transparent">

      <div className="flex flex-wrap gap-0 md:gap-[7.5%] xl:gap-[2.5%] -m-4 bg-transparent px-3">
          {Fundraisers.map(item => 
          //component ???
            <Link to={`/dashboard/fundraisers/${item._id}`} className="relative xl:w-[18%] md:w-[45%] pb-4 w-full bg-white rounded mb-10 shadow-form">
                <button className="absolute top-1 right-1 text-zinc-700 bg-white rounded-md p-0.5 z-10">
                  <IconContext.Provider value={{ className: 'w-5 h-5'}}>
                    <BiDotsVerticalRounded />
                  </IconContext.Provider>
                </button>
                <div className="block relative w-full rounded-t overflow-hidden">
                  <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={item.image ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item.image}` : "https://dummyimage.com/700x400"} />
                </div>
                <div className="mt-4 px-4">
                  <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                  <progress max="100" value="25" className="w-full h-1.5 mt-1 overflow-hidden rounded bg-secondary/10 [&::-webkit-progress-bar]:bg-secondary/10 [&::-webkit-progress-value]:bg-secondary [&::-moz-progress-bar]:bg-secondary" />
                  <div>
                    <span className="mt-1">00.00 TND</span>
                    <span className="text-gray-500 text-xs tracking-widest title-font mb-1"> de {item.goal}.00 TND collectés</span> 
                </div>
                </div>
            </Link>
          )}
        </div>

  </div>
        :

        <h2 className="w-full text-center mt-5">Pas de 3aweni trouvés. <Link to='/create/category' className="underline text-primary">Créez-en un</Link></h2>}
</main>
  )
}
