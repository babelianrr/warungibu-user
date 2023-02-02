import {useRouter} from 'next/router'

export default function ProtectedRoute(ProtectedComponent) {
  return (props) => {
    if (typeof window !== 'undefined') {
      const Router = useRouter()
      const accessToken = localStorage.getItem('token')
      if (!accessToken) {
        Router.replace('/login')
        return null
      }
      return <ProtectedComponent {...props} />
    }
    return null
  }
}
