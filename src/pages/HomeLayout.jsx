import { Outlet, useNavigation } from 'react-router-dom'
import { Header, Navbar, Loading } from '../components'

function HomeLayout() {
  const navigation = useNavigation()

  const isPending = navigation.state === 'loading'
  return (
    <>
      <Header />
      <Navbar />
      {isPending ? (
        <Loading />
      ) : (
        <section className="align-element py-8 lg:py-20 ">
          <Outlet />
        </section>
      )}
    </>
  )
}
export default HomeLayout
