import MyApp from './_app'
import Frontpage from './frontpage/frontpage'

export default function Index() {

  return (
    <>
      <MyApp Component={Frontpage} pageProps={"a"}/>
    </>
  )
}
