import { createContext, useCallback, useContext, useMemo } from "react";
import useRequest from "../hooks/useRequest";
import useFetch from "../hooks/useFetch";

const UsersContext = createContext(null)

const UsersContextProvider = ({children}) => {
    const {response, loading:dataLoading, resendRequest} = useFetch({url: '/api/v1/users', method: 'GET'})
    const {sendRequest, loading:deleteLoading} = useRequest({method: 'DELETE'})

    const userList = useMemo(() => {
        return response?.items.map(user => {
            return{
              firstname: user.firstname,
              lastname: user.lastname,
              id: user._uuid
              }
          }) || []
    }, [response])

    const onDelete = useCallback(() => (userId) => {
        sendRequest(null, `/api/v1/users/${userId}`).then(() => resendRequest())
    }, [resendRequest])

    const contextValue = useMemo(() => ({
        dataLoading,
        deleteLoading,
        userList,
        onDelete
    }), [dataLoading, deleteLoading, userList, onDelete])

    return <UsersContext.Provider value={contextValue}>
        {children}
    </UsersContext.Provider>
}

export const useUsersContext = () => {
    const contextValue = useContext(UsersContext)
    if(!contextValue) throw new Error('Your component is not inside UserContextProvider')

    return contextValue
}

export default UsersContextProvider