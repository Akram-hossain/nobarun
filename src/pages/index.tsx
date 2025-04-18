import { gql } from '@apollo/client';
import GoToTop from '@component/goToTop/GoToTop';
import Navbar from '@component/navbar/Navbar';
import useAllProductCategories from '@hook/Home/useAllProductCategories';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/autoplay';
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import AppLayout from '../components/layout/AppLayout';
import client from '../config/ApolloClient';

const HomePage = ({ clients, categories, featuredCategories }) => {
  return (
    <>
      <main>
        <GoToTop showBelow={250} />
        <Navbar navListOpen={true} height={400} categories={categories} />
        {/* hero section start */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-img">
              <Swiper
                loop={true}
                speed={1000}
                autoplay={{ delay: 5000 }}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              >
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/slider-1.webp"
                    alt="hero Image one"
                    className="desktop-banner"
                  />
                  <Image
                    src="/assets/images/banners/mobile/slider-1.webp"
                    width={550}
                    height={245}
                    alt="hero Mobile Image one"
                    className="mobile-banner"
                    priority
                    layout="responsive"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/slider-2.webp"
                    alt="hero Image two"
                    className="desktop-banner"
                  />
                  <Image
                    src="/assets/images/banners/mobile/slider-2.webp"
                    width={550}
                    height={245}
                    alt="hero Mobile Image two"
                    className="mobile-banner"
                    layout="responsive"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/slider-3.webp"
                    alt="hero Image Three"
                    className="desktop-banner"
                    // loading="lazy"
                  />
                  <Image
                    src="/assets/images/banners/mobile/slider-3.webp"
                    width={550}
                    height={245}
                    alt="hero Mobile Image three"
                    className="mobile-banner"
                    layout="responsive"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/slider-4.webp"
                    alt="hero Image Four"
                    className="desktop-banner"
                    // loading="lazy"
                  />
                  <Image
                    src="/assets/images/banners/mobile/slider-4.webp"
                    width={550}
                    height={245}
                    alt="hero Mobile Image Four"
                    className="mobile-banner"
                    layout="responsive"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="/assets/images/banners/slider-5.webp"
                    alt="hero Image Five"
                    className="desktop-banner"
                    // loading="lazy"
                  />
                  <Image
                    src="/assets/images/banners/mobile/slider-5.webp"
                    width={550}
                    height={245}
                    alt="hero Mobile Image Five"
                    className="mobile-banner"
                    layout="responsive"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>
        {/* hero section end */}

        {/* out clients section start */}
        <section className="our-clients-section">
          <div className="container">
            <div className="client-heading">
              <h2>Our Clients</h2>
              <Link href={`/clients`}>
                <a>
                  <span>View All</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    width="20"
                    height="20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </a>
              </Link>
            </div>
            <div className="clients-main-wrap">
              {clients
                .filter((item, index) => item && index < 8)
                .map((item, index) => (
                  <Link href="#" key={index}>
                    <a>
                      <div className="client-box">
                        <img
                          src={process.env.NEXT_PUBLIC_IMAGE_URL + item.imgUrl}
                          alt={`Image for ${item.title} client`}
                          className="lazyload"
                          loading="lazy"
                        />
                        <p>{item.title}</p>
                      </div>
                    </a>
                  </Link>
                ))}
            </div>
          </div>
        </section>
        {/* out clients section end */}

        {/* featured categories section start */}
        <section className="featured-categories-section">
          <div className="container">
            <div className="client-heading text-begin">
              <h3>Featured Categories</h3>
            </div>
            <div className="category-main-wrap">
              {featuredCategories.map((category, index) => (
                <Link key={index} href={`/category/${category.slug}`}>
                  <a>
                    <div className="category-box">
                      <div className="img-placee">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_IMAGE_URL + category.image
                          }
                          alt={`Thumbnail for ${category.name} featured category`}
                        />
                      </div>
                      <h4>{category.name}</h4>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
        {/* featured categories section end */}
      </main>
    </>
  );
};
HomePage.layout = AppLayout;

export async function getStaticProps() {
  let categories = [];
  let clients = [];
  let count = null;
  let collections = [];
  let featuredCategories = [];
  try {
    categories = await useAllProductCategories();
    categories = JSON.parse(JSON.stringify(categories));
    featuredCategories = categories.filter((category) => category.isFeatured);
  } catch (e) {}
  try {
    let { data } = await client.query({
      query: gql`
        query getFeaturedClients {
          getAllFeaturedClients {
            id
            title: clientName
            imgUrl: logo
          }
        }
      `,
    });
    clients = data.getAllFeaturedClients;
  } catch (e) {}
  try {
    let { data } = await client.query({
      query: gql`
        query getCollectionWiseProduct {
          getAllPopulatedCollection {
            name
            slug
            products {
              product {
                id: slug
                productName
                discount
                featured
                populatedCategory {
                  name
                  icon
                }
              }
              reviewCount
              ratingAverage
            }
          }
        }
      `,
    });
    collections = data.getAllPopulatedCollection;
  } catch (e) {
  } finally {
    return {
      props: {
        clients,
        categories,
        featuredCategories,
        collections,
        count,
      },
      revalidate: 40,
    };
  }
}

export default HomePage;
