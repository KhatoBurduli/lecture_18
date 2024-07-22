import { useRef } from "react"

const UserForm = ({onFormSubmit, firstname, lastname}) => {

    const firstnameRef = useRef()
    const lastnameRef = useRef()

    const onSubmit = (e) => {
        e.preventDefault()
        if(firstnameRef.current && lastnameRef.current){
            onFormSubmit(firstnameRef.current.value, lastnameRef.current.value)
    }else{
        console.log("Please fill all the information")
    }
}

    return <form onSubmit={onSubmit}>
        <input 
            type="text" 
            placeholder="firstname" 
            ref={firstnameRef}
            defaultValue={firstname}
        />
        <input 
            type="text" 
            placeholder="lastname" 
            ref={lastnameRef}
            defaultValue={lastname}
        />
        <button>Submit</button>
    </form>
}

export default UserForm