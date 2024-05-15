import {useRouter} from 'next/router'

export default function IsVerifiedRoute(ProtectedComponent) {
  return (props) => {
    // if (typeof window !== 'undefined') {
    //   const Router = useRouter()
    //   const isVerified = window?.localStorage?.isVerified
    //   const verifiedStep = isVerified && JSON.parse(isVerified)
    //   if (!verifiedStep && verifiedStep !== undefined) {
    //     Router.replace('/verification-token')
    //     return null
    //   }
    // }
    // return null
    return <ProtectedComponent {...props} />
  }
}
