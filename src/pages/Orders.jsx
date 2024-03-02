import { redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

export const loader = (store) => () => {
  const user = store.getState().userState.user
  if(!user) {
    toast.warn('You must logged in to view orders');
    return redirect('/login');
  }
  return null
}
function Orders() {
  return (
    <div>Orders</div>
  )
}
export default Orders