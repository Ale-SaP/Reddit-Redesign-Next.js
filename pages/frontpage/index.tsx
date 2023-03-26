import MyApp from '../_app'
import Frontpage from './frontpage'

export default function Index() {

  return (
    <>
      <MyApp Component={Frontpage} pageProps={"a"}/>
    </>
  )
}
