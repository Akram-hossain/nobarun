import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
// import Head from 'next/head';
import { gql } from '@apollo/client';
import GoToTop from '@component/goToTop/GoToTop';
import client from '../config/ApolloClient';
// import Testimonials from '@component/Home/Testimonials';
import useAllProductCategories from '@hook/Home/useAllProductCategories';
import AppLayout from '../components/layout/AppLayout';
//
import imageLoader from '@component/ImageLoader';
import Image from 'next/image';
import Box from '../components/Box';
import Card from '../components/Card';
import Container from '../components/Container';
import FlexBox from '../components/FlexBox';
import HoverBox from '../components/HoverBox';
import { H2, H3, H4, H6, SemiSpan } from '../components/Typography';
import { StyledCarouselCard1 } from '../components/carousel-cards/CarouselCardStyle';
import Grid from '../components/grid/Grid';
import Icon from '../components/icon/Icon';
import Navbar from '../components/navbar/Navbar';
import { StyledProductCard1 } from '../components/product-cards/CardStyle';
import Rating from '../components/rating/Rating';
import useWindowSize from '../hooks/useWindowSize';

const IndexPage = ({
  clients,
  categories,
  featuredCategories,
  collections,
}) => {
  const width = useWindowSize();
  const [height, setHeight] = useState(400);
  const isTablet = width < 1025;
  const isMobile = width <= 768;
  const heroContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rect = heroContainer?.current?.getBoundingClientRect();
    setHeight(rect.height);
  }, [heroContainer?.current?.offsetHeight]);

  return (
    <>
      <main>
        <GoToTop showBelow={250} />
        <Fragment>
          <Navbar navListOpen={true} height={height} categories={categories} />
          <Box bg="gray.white" mt={isTablet ? '2.5rem' : ''}>
            <Container ref={heroContainer}>
              <StyledCarouselCard1>
                <div className="image-holder" style={{ width: '100%' }}>
                  <img
                    src={
                      '/assets/images/banners/1-Bakery-Equipment-nobarun.webp'
                    }
                    alt="Hero Image of Nobarun"
                    // width="100%"
                    // height="100%"
                    style={{
                      objectFit: 'cover',
                      // width: '100%',
                      // height: '100%',
                    }}
                    // className="lazyload object-fit-cover"
                  />

                  {/* <Image
                    src={`/assets/images/banners/1-Bakery-Equipment-nobarun.webp`}
                    alt={`Hero Image of Nobarun`}
                    width="100%"
                    height="100%"
                    quality={70}
                    className="object-fit-cover lazyload"
                  /> */}
                </div>
              </StyledCarouselCard1>
            </Container>
          </Box>
        </Fragment>

        <Container className="container-width">
          {!isMobile && clients && clients.length ? (
            <Fragment>
              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                mb="1.5rem"
              >
                <H2
                  fontWeight="600"
                  lineHeight="1"
                  fontSize={
                    width < 600 ? (width < 400 ? '20px' : '26px') : '32px'
                  }
                  mb="1.5rem"
                  ml={width < 600 ? '1rem' : '0'}
                  style={{
                    marginLeft: '45%',
                    textTransform: 'capitalize',
                    transform: 'translateY(.8rem)',
                  }}
                >
                  {'Our Clients'}
                </H2>
                <Link href={`/clients`}>
                  <a>
                    <FlexBox alignItems="center" ml="0.5rem" color="text.muted">
                      <SemiSpan mr="0.5rem">View all</SemiSpan>
                      <Icon size="12px" defaultcolor="currentColor">
                        right-arrow
                      </Icon>
                    </FlexBox>
                  </a>
                </Link>
              </FlexBox>
              <Grid container spacing={0}>
                {clients
                  .filter((item, index) => item && index < 8)
                  .map((item, index) => (
                    <Grid
                      item
                      lg={1.5}
                      md={1.5}
                      sm={4}
                      key={index + 1}
                      className="featuredCategories"
                    >
                      <Box className="client client_related">
                        <HoverBox borderRadius={5} className="client__body">
                          <img
                            src={
                              process.env.NEXT_PUBLIC_IMAGE_URL + item.imgUrl
                            }
                            alt={`Image for ${item.title} client`}
                            width="151px"
                            height="139px"
                            className="object-fit-cover lazyload"
                          />
                        </HoverBox>
                        <p
                          className="client__title"
                          style={{
                            fontSize: '1.4rem',
                            fontWeight: 600,
                            margin: 0,
                          }}
                        >
                          {item.title}
                        </p>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Fragment>
          ) : null}
        </Container>

        <Box mt="5rem" mb="5rem">
          <Container>
            {featuredCategories && featuredCategories.length ? (
              <Box>
                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="1.5rem"
                >
                  <FlexBox alignItems="center">
                    <H3
                      fontWeight="600"
                      lineHeight="1"
                      fontSize={
                        // width < 600 ? (width < 400 ? '20px' : '26px') : '32px'
                        '32px'
                      }
                      mb="1.5rem"
                      ml={width < 600 ? '1rem' : '0'}
                      style={{
                        textTransform: 'capitalize',
                        transform: 'translateY(.8rem)',
                      }}
                    >
                      {'Featured Categories'}
                    </H3>
                  </FlexBox>
                </FlexBox>
                <Card
                  p="1rem"
                  mt="4rem"
                  bg="transparent"
                  boxShadow="none"
                  style={{ minHeight: '350px' }}
                >
                  <Grid container spacing={4}>
                    {featuredCategories.map((item) => (
                      <Grid
                        item
                        xl={3}
                        lg={3}
                        md={4}
                        sm={6}
                        xs={6}
                        key={item.name}
                        className="featuredCategories"
                      >
                        <Link href={`/category/${item.slug}`}>
                          <a>
                            <FlexBox
                              alignItems="center"
                              flexDirection="column"
                              justifyContent="center"
                            >
                              <HoverBox
                                borderRadius={5}
                                mb="0.5rem"
                                className="featuredCategories__image"
                              >
                                <Image
                                  loader={imageLoader}
                                  src={item.image}
                                  alt={`Thumbnail for ${item.name} featured category`}
                                  width="290px"
                                  height="290px"
                                  quality={90}
                                  className="object-fit-cover lazyload"
                                />
                              </HoverBox>
                              <H4
                                fontSize="18px"
                                fontWeight="600"
                                className="featuredCategories__title"
                              >
                                {item.name}
                              </H4>
                            </FlexBox>
                          </a>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Box>
            ) : null}
          </Container>
        </Box>

        {collections &&
        collections.length &&
        collections[0] &&
        collections[0].products &&
        collections[0].products.length ? (
          <Box mb="8rem">
            <Box my="4rem">
              <Container pb="1rem">
                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="1.5rem"
                >
                  <FlexBox alignItems="center">
                    <H2
                      fontWeight="600"
                      lineHeight="1"
                      fontSize={
                        width < 600 ? (width < 400 ? '20px' : '26px') : '32px'
                      }
                      mb="1.5rem"
                      ml={width < 600 ? '1rem' : '0'}
                      style={{
                        textTransform: 'capitalize',
                        transform: 'translateY(.8rem)',
                      }}
                    >
                      {collections[0].name}
                    </H2>
                  </FlexBox>
                  {collections[0].slug && (
                    <Link href={`/product/collection/${collections[0].slug}`}>
                      <a>
                        <FlexBox
                          alignItems="center"
                          ml="0.5rem"
                          color="text.muted"
                        >
                          <SemiSpan mr="0.5rem">View all</SemiSpan>
                          <Icon size="12px" defaultcolor="currentColor">
                            right-arrow
                          </Icon>
                        </FlexBox>
                      </a>
                    </Link>
                  )}
                </FlexBox>
                <Grid container spacing={4}>
                  {collections[0].products
                    .filter((item, index) => item && index < 4)
                    .map(({ product, reviewCount, ratingAverage }) => (
                      <Grid
                        item
                        xl={3}
                        lg={3}
                        md={6}
                        sm={6}
                        xs={6}
                        key={product?.id}
                      >
                        <Box py="0.25rem" key={product?.id}>
                          <StyledProductCard1 {...product}>
                            <div className="image-holder">
                              <Link href={`/${product.id}`}>
                                <a>
                                  <img
                                    data-src={
                                      process.env.NEXT_PUBLIC_IMAGE_URL +
                                      product.featured
                                    }
                                    alt={product.productName}
                                    height={360}
                                    className="lazyload"
                                  />
                                </a>
                              </Link>
                            </div>
                            <div className="details">
                              <FlexBox>
                                <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
                                  <Link href={`/${product.id}`}>
                                    <a>
                                      <FlexBox alignItems="center">
                                        <img
                                          data-src={
                                            product.populatedCategory &&
                                            product.populatedCategory.icon
                                              ? process.env
                                                  .NEXT_PUBLIC_IMAGE_URL +
                                                product.populatedCategory.icon
                                              : ''
                                          }
                                          width={30}
                                          height={30}
                                          alt={
                                            product.populatedCategory &&
                                            product.populatedCategory.name
                                              ? product.populatedCategory.name
                                              : ''
                                          }
                                          className="lazyload"
                                        />
                                        <SemiSpan
                                          className="title"
                                          color="text.hint"
                                          title={
                                            product.populatedCategory &&
                                            product.populatedCategory.name
                                              ? product.populatedCategory.name
                                              : ''
                                          }
                                        >
                                          {product.populatedCategory &&
                                          product.populatedCategory.name
                                            ? product.populatedCategory.name
                                            : ''}
                                        </SemiSpan>
                                      </FlexBox>
                                    </a>
                                  </Link>
                                  <Link href={`/${product.id}`}>
                                    <a>
                                      <H3
                                        className="title"
                                        textAlign="left"
                                        fontWeight="600"
                                        color="text.secondary"
                                        mt="10px"
                                        mb="5px"
                                        title={product.productName}
                                      >
                                        {product.productName}
                                      </H3>
                                    </a>
                                  </Link>
                                  <FlexBox alignItems="center">
                                    <Rating
                                      value={ratingAverage || 0}
                                      outof={5}
                                      color="warn"
                                      readonly
                                    />
                                    <H6 ml=".5rem" color="#ddd">
                                      ({reviewCount || 0})
                                    </H6>
                                  </FlexBox>
                                </Box>
                              </FlexBox>
                            </div>
                          </StyledProductCard1>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Container>
            </Box>
          </Box>
        ) : null}
        {collections &&
        collections.length &&
        collections[1] &&
        collections[1].products &&
        collections[1].products.length ? (
          <Box mb="8rem">
            <Box my="4rem">
              <Container pb="1rem">
                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="1.5rem"
                >
                  <FlexBox alignItems="center">
                    <H2
                      fontWeight="600"
                      lineHeight="1"
                      fontSize={
                        width < 600 ? (width < 400 ? '20px' : '26px') : '32px'
                      }
                      mb="1.5rem"
                      ml={width < 600 ? '1rem' : '0'}
                      style={{
                        textTransform: 'capitalize',
                        transform: 'translateY(.8rem)',
                      }}
                    >
                      {collections[1].name}
                    </H2>
                  </FlexBox>

                  {collections[1].slug && (
                    <Link href={`/product/collection/${collections[1].slug}`}>
                      <a>
                        <FlexBox
                          alignItems="center"
                          ml="0.5rem"
                          color="text.muted"
                        >
                          <SemiSpan mr="0.5rem">View all</SemiSpan>
                          <Icon size="12px" defaultcolor="currentColor">
                            right-arrow
                          </Icon>
                        </FlexBox>
                      </a>
                    </Link>
                  )}
                </FlexBox>
                <Grid container spacing={4}>
                  {collections[1].products
                    .filter((item, index) => item && index < 4)
                    .map(({ product, reviewCount, ratingAverage }) => (
                      <Grid
                        item
                        xl={3}
                        lg={3}
                        md={6}
                        sm={6}
                        xs={6}
                        key={product?.id}
                      >
                        <Box py="0.25rem" key={product?.id}>
                          <StyledProductCard1 {...product}>
                            <div className="image-holder">
                              <Link href={`/${product.id}`}>
                                <a>
                                  <img
                                    data-src={
                                      process.env.NEXT_PUBLIC_IMAGE_URL +
                                      product.featured
                                    }
                                    alt={product.productName}
                                    height={360}
                                    className="lazyload"
                                  />
                                </a>
                              </Link>
                            </div>
                            <div className="details">
                              <FlexBox>
                                <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
                                  <Link href={`/${product.id}`}>
                                    <a>
                                      <FlexBox alignItems="center">
                                        <img
                                          data-src={
                                            product.populatedCategory &&
                                            product.populatedCategory.icon
                                              ? process.env
                                                  .NEXT_PUBLIC_IMAGE_URL +
                                                product.populatedCategory.icon
                                              : ''
                                          }
                                          width={30}
                                          height={30}
                                          alt={
                                            product.populatedCategory &&
                                            product.populatedCategory.name
                                              ? product.populatedCategory.name
                                              : ''
                                          }
                                          className="lazyload"
                                        />
                                        <SemiSpan
                                          className="title"
                                          color="text.hint"
                                          title={
                                            product.populatedCategory &&
                                            product.populatedCategory.name
                                              ? product.populatedCategory.name
                                              : ''
                                          }
                                        >
                                          {product.populatedCategory &&
                                          product.populatedCategory.name
                                            ? product.populatedCategory.name
                                            : ''}
                                        </SemiSpan>
                                      </FlexBox>
                                    </a>
                                  </Link>
                                  <Link href={`/${product.id}`}>
                                    <a>
                                      <H3
                                        className="title"
                                        textAlign="left"
                                        fontWeight="600"
                                        color="text.secondary"
                                        mt="10px"
                                        mb="5px"
                                        title={product.productName}
                                      >
                                        {product.productName}
                                      </H3>
                                    </a>
                                  </Link>
                                  <FlexBox alignItems="center">
                                    <Rating
                                      value={ratingAverage || 0}
                                      outof={5}
                                      color="warn"
                                      readonly
                                    />
                                    <H6 ml=".5rem" color="#ddd">
                                      ({reviewCount || 0})
                                    </H6>
                                  </FlexBox>
                                </Box>
                              </FlexBox>
                            </div>
                          </StyledProductCard1>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Container>
            </Box>
          </Box>
        ) : null}
        {collections &&
        collections.length &&
        collections[2] &&
        collections[2].products &&
        collections[2].products.length ? (
          <Box mb="8rem">
            <Box my="4rem">
              <Container pb="1rem">
                <FlexBox
                  justifyContent="space-between"
                  alignItems="center"
                  mb="1.5rem"
                >
                  <FlexBox alignItems="center">
                    <H2
                      fontWeight="600"
                      lineHeight="1"
                      fontSize={
                        width < 600 ? (width < 400 ? '20px' : '26px') : '32px'
                      }
                      mb="1.5rem"
                      ml={width < 600 ? '1rem' : '0'}
                      style={{
                        textTransform: 'capitalize',
                        transform: 'translateY(.8rem)',
                      }}
                    >
                      {collections[2].name}
                    </H2>
                  </FlexBox>

                  {collections[2].slug && (
                    <Link href={`/product/collection/${collections[2].slug}`}>
                      <a>
                        <FlexBox
                          alignItems="center"
                          ml="0.5rem"
                          color="text.muted"
                        >
                          <SemiSpan mr="0.5rem">View all</SemiSpan>
                          <Icon size="12px" defaultcolor="currentColor">
                            right-arrow
                          </Icon>
                        </FlexBox>
                      </a>
                    </Link>
                  )}
                </FlexBox>
                <Grid container spacing={4}>
                  {collections[2].products
                    .filter((item, index) => item && index < 4)
                    .map(({ product, reviewCount, ratingAverage }) => (
                      <Grid
                        item
                        xl={3}
                        lg={3}
                        md={6}
                        sm={6}
                        xs={6}
                        key={product?.id}
                      >
                        <Box py="0.25rem" key={product?.id}>
                          <StyledProductCard1 {...product}>
                            <div className="image-holder">
                              <Link href={`/${product.id}`}>
                                <a>
                                  <img
                                    data-src={
                                      process.env.NEXT_PUBLIC_IMAGE_URL +
                                      product.featured
                                    }
                                    alt={product.productName}
                                    height={360}
                                    className="lazyload"
                                  />
                                </a>
                              </Link>
                            </div>
                            <div className="details">
                              <FlexBox>
                                <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
                                  <Link href={`/${product.id}`}>
                                    <a>
                                      <FlexBox alignItems="center">
                                        <img
                                          data-src={
                                            product.populatedCategory &&
                                            product.populatedCategory.icon
                                              ? process.env
                                                  .NEXT_PUBLIC_IMAGE_URL +
                                                product.populatedCategory.icon
                                              : ''
                                          }
                                          width={30}
                                          height={30}
                                          alt={
                                            product.populatedCategory &&
                                            product.populatedCategory.name
                                              ? product.populatedCategory.name
                                              : ''
                                          }
                                          className="lazyload"
                                        />
                                        <SemiSpan
                                          className="title"
                                          color="text.hint"
                                          title={
                                            product.populatedCategory &&
                                            product.populatedCategory.name
                                              ? product.populatedCategory.name
                                              : ''
                                          }
                                        >
                                          {product.populatedCategory &&
                                          product.populatedCategory.name
                                            ? product.populatedCategory.name
                                            : ''}
                                        </SemiSpan>
                                      </FlexBox>
                                    </a>
                                  </Link>
                                  <Link href={`/${product.id}`}>
                                    <a>
                                      <H3
                                        className="title"
                                        textAlign="left"
                                        fontWeight="600"
                                        color="text.secondary"
                                        mt="10px"
                                        mb="5px"
                                        title={product.productName}
                                      >
                                        {product.productName}
                                      </H3>
                                    </a>
                                  </Link>
                                  <FlexBox alignItems="center">
                                    <Rating
                                      value={ratingAverage || 0}
                                      outof={5}
                                      color="warn"
                                      readonly
                                    />
                                    <H6 ml=".5rem" color="#ddd">
                                      ({reviewCount || 0})
                                    </H6>
                                  </FlexBox>
                                </Box>
                              </FlexBox>
                            </div>
                          </StyledProductCard1>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Container>
            </Box>
          </Box>
        ) : null}
        {/*<Testimonials />*/}
      </main>
    </>
  );
};
//
IndexPage.layout = AppLayout;
//
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
      revalidate: 30,
    };
  }
}

export default IndexPage;
