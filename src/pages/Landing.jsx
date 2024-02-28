import { Link } from 'react-router-dom'
import {customFetch} from '../utils'

import hero1 from '../assets/hero1.webp'
import hero2 from '../assets/hero2.webp'
import hero3 from '../assets/hero3.webp'
import hero4 from '../assets/hero4.webp'
import { FeaturedProducts } from '../components'

const carouselImages = [hero1, hero2, hero3, hero4]

const url = '/products?featured=true'

export const loader = async() => {
  const response = await customFetch(url)
  const products = response.data.data //массив
  return {products}
}
//лучше разбить на компоненты по sections
function Landing() {

  return (
    <>
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight  sm:text-6xl ">
            We’re changing the way people shop.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
            commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua. Anim aute id magna aliqua
            ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
          </p>
          <div className="mt-10 ">
            <Link to="products" className="btn btn-primary ">
              Our Products
            </Link>
          </div>
        </div>
        <div className="hidden  h-[28rem] lg:carousel carousel-center   p-4 space-x-4 bg-neutral rounded-box">
          {carouselImages.map((image, index) => {
            return (
              <div key={image} className="carousel-item">
                <img src={image} className="rounded-box h-full w-80  object-cover" />
              </div>
            )
          })}
        </div>
      </div>
      <div className="card mt-16 lg:card-side bg-base-100 shadow-xl ">ccc</div>
      <div className="card mt-16 glass">
        <div className="card-body">
          <h2 className="card-title">Life hack</h2>
          <p>How to park your car at your garage?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Learn now!</button>
          </div>
        </div>
      </div>
      <FeaturedProducts/>
    </>
  )
}
export default Landing
