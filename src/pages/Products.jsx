
import { Filters, PaginationContainer, ProductsContainer } from "../components"
import {customFetch} from '../utils'

export const loader = async({request}) => {
  //? подход когда только поиск и нет фильтрации
  //это пока только целая ссылка - new URL(request.url)
  //const params = new URL(request.url).searchParams
  //const search = params.get('search')
  //search то что мы ввели только взятое с url

  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])
  const response = await customFetch(`/products`, {params})
  const products = response.data.data //массив
  const meta = response.data.meta
  return { products, meta, params }
}
function Products() {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  )
}
export default Products

//TODO meta.pagination:
//{page: 1, pageSize: 10, pageCount: 3, total: 22}