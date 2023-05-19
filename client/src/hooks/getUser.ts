import axios from "../utils/axiosConfig"
import { userInt } from "../utils/interfaces";


const getUser = ({ login, logout, setLoading }: { login: (user: userInt) => void, logout: () => void, setLoading: React.Dispatch<React.SetStateAction<boolean>>}) => {


    setLoading(true)
    axios.get('/api/user',
        { withCredentials: true })
        .then((res) => {
            
            const { data: { user } } = res
            console.log(res);
            
            if(user){ 
                
                login(user)
            }
            
            setLoading(false)
            

        }).catch((error) => {
            console.log(error);
            
            logout()
            setLoading(false)
        })
}

export default getUser