import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"

const Test = () => {

    const [username , setUserName] = useState<string|null>(null)
    useEffect(()=> {
        const token = localStorage.getItem("token") ; 
        if(token) {
            const userData = jwtDecode(token) ; 
            console.log(userData); 
            if(userData) {
                setUserName(userData.sub + "") ; 
            }
        }
    },  []) ; 


    return (
       <div className="container">
        {
            username && <div>Xin chao , {username}</div>
        }

       </div>
    )
}
export default Test ; 