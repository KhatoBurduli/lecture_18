import { useNavigate, useParams } from "react-router-dom"
import UserForm from "../components/UserForm"
import useFetch from "../hooks/useFetch"
import useRequest from "../hooks/useRequest"

const UpdatePage = () => {
    const navigate = useNavigate()
    const {userId} = useParams()
    const {response, loading, error} = useFetch({url: `/api/v1/users/${userId}`, method: 'GET'})

    const {sendRequest} = useRequest({url: `/api/v1/users/${userId}`, method: 'PUT'})

    const onSubmit = (firstname, lastname) => {
        sendRequest({firstname, lastname})
        .then(() => navigate('/'))
        .catch(err => console.log(err))
    }

    if(loading && !response) return <p>Loading . . .</p>
    if(error || !response) return <p>Something went wrong</p>

    return <UserForm onFormSubmit={onSubmit} firstname={response.firstname} lastname={response.lastname}/>
}

export default UpdatePage