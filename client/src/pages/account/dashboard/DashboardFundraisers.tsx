import axios from "axios"
import { useEffect, useState } from "react"
import { fundraiserInt } from "../../../utils/interfaces"
import { Link } from "react-router-dom"


export default function DashboardFundraisers() {

  const [Fundraisers, setFundraisers] = useState<fundraiserInt[]>([])

  useEffect(() => {
    axios.get('/api/user/fundraisers', {
      withCredentials: true
    }).then((response) => {
      const { data: { fundraisers } } = response
      
      setFundraisers(fundraisers)

      
    }).catch((error) => {
      console.log(error);
    })
  },[])
    
  return (
    <main className="text-gray-600 bg-gray-100 dashboard-main-section">
  <div className="container px-5 py-24 mx-auto bg-transparent">
    <div className="flex flex-wrap gap-0 md:gap-[7.5%] xl:gap-[2.5%] -m-4 bg-transparent px-3">

      {Fundraisers.map(item => 
        <Link to={`/account/dashboard/fundraisers/${item._id}`} className="xl:w-[18%] md:w-[45%] pb-4 w-full bg-white rounded mb-10 shadow-form">
            <div className="block relative w-full rounded-t overflow-hidden">
              <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={item.image ? `https://res.cloudinary.com/dhwfr0ywo/image/upload/${item.image}` : "https://dummyimage.com/420x260"} />
            </div>
            <div className="mt-4 px-4">
              <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
              <progress max="100" value="25" className="w-full h-1.5 mt-1 overflow-hidden rounded bg-secondary_color/10 [&::-webkit-progress-bar]:bg-secondary_color/10 [&::-webkit-progress-value]:bg-secondary_color [&::-moz-progress-bar]:bg-secondary_color" />
              <div>
                <span className="mt-1">00.00 TND</span>
                <span className="text-gray-500 text-xs tracking-widest title-font mb-1"> de {item.goal}.00 TND collectés</span> 
            </div>
            </div>
        </Link>
      )}

      </div>
  </div>
</main>
  )
}
