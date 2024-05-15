const AccessComp = ({children}) => {
    if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem('token')
            if (accessToken) {
                return children
            }
    }
    return null
}

export default AccessComp