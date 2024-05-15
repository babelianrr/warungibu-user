import Header from './Header'
import Footer from './Footer'
// import ChatWidget from '../widget/ChatWidget'
import BottomTab from '../mobile/BottomTab'
import {fetchGet} from 'helpers/fetch'
import {isAuthenticated} from 'helpers/isAuthenticated'

export default function MainLayout({BottomComponent = BottomTab, children, backTo, footer = true, bottomMenu = true, heightScreen = 'min-h-screen'}) {
  return (
    <>
      <Header backTo={backTo} />
      <section className={`${heightScreen}`}>{children}</section>
      {footer ? 
        <Footer />
      : ''
      }
      {/* <div className="hidden sm:block">{isAuthenticated() && <ChatWidget />}</div> */}
      {bottomMenu ?
        <div className="block sm:hidden">{<BottomComponent />}</div>
      :''
      }
    </>
  )
}
