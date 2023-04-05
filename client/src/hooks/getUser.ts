import axios from "axios"
import { userInt } from "../utils/interfaces";


const getUser = ({ login, logout, setLoading }: { login: (user: userInt) => void, logout: () => void, setLoading: React.Dispatch<React.SetStateAction<boolean>>}) => {


    setLoading(true)
    axios.get('/api/user',
        { withCredentials: true })
        .then((res) => {
            
            const { data: { user } } = res
            
            if(user){ 
                
                login(user)
            }
            
            setLoading(false)
            

        }).catch(() => {
            logout()
            setLoading(false)
        })
}

export default getUser