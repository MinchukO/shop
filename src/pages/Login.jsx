import { FormInput, SubmitBtn } from '../components'
import { Form, Link, redirect, useNavigate } from 'react-router-dom'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { loginUser } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'

// action: actionRegister(store),что бы не вызывался при рендере надо вернуть функцию
// action не рендерится когда попадаем на страницу, только когда отправляем форму
// ткпкрь есть доступ к методу dispatch
//? name="identifier" важный момент, требования api

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData) //{username: 'ol', email: 'ol@gmail.com', password: '111'}
    try {
      await customFetch.post('/auth/local/register', data)
      toast.success('account created successfully')
      return redirect('/login')
    } catch (error) {
      console.log(error)
      const errorMessage =
        error?.response?.data?.error?.message || 'please double check your credentials'
      toast.error(errorMessage)
      return null
    }
  }
function Login() {
  return (
    <section className="h-screen grid place-items-center">
      <Form method="post" className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="identifier" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button type="button" className="btn btn-secondary btn-block">
          guest user
        </button>
        <p className="text-center">
          Not a member yet?{' '}
          <Link to="/register" className="ml-2 link link-hover link-primary capitalize">
            register
          </Link>
        </p>
      </Form>
    </section>
  )
}
export default Login
