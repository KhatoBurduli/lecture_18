import { useNavigate } from "react-router-dom"
import UserForm from "../components/UserForm"
import useRequest from "../hooks/useRequest"

const CreatePage = () => {
    const {sendRequest, loading} = useRequest({url: '/api/v1/users', method: 'POST'})
    const navigate = useNavigate()

    const onSubmit = (firstname, lastname) => {
        sendRequest([{firstname, lastname}])
            .then(() => navigate('/'))
            .catch(err => console.log(err))
    }
    if(loading) return <p>Loading . . .</p>
    return <UserForm onFormSubmit={onSubmit}/>
}

export default CreatePage