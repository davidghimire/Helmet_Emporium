import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Helmet from '../../ImagesDisplayed/helmet.png';
import Gloves from '../../ImagesDisplayed/helmet.png';
import Parts from '../../ImagesDisplayed/parts.png';


const Banner = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '98.9 %',
  height: '100%',
  padding: '2px 8px',

  backgroundColor: '#E5E4E2',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
  },
}));

const BannerContent = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'centre',
  flexDirection: 'column',
  padding: '30px',
  maxWidth: '420',
}));

const Title = styled('div')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: 1.5,
  fontSize: '70px',
  marginBottom: '20px',
  marginRight: '100px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '35px',
  },
}));

const Description = styled('div')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: '400',
  lineHeight: 1.25,
  letterSpacing: 1.25,
  marginBottom: '20px',
  [theme.breakpoints.down('md')]: {
    lineHeight: 1.15,
    letterSpacing: 1.15,
    marginBottom: '1.5em',
  },
}));

const Image = styled('img')(({ src, theme }) => ({
  flex: 1,
  src: `url(${src})`,
  width: '100%',
  height: '50vh',
  objectFit: 'contain',
  [theme.breakpoints.down('md')]: {
    width: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '200px',
    height: '180px',
  },
}));

const Wrapper = styled('div')`
  display: flex;
  justifycontent: center;
`;
const Text = styled('div')`
  font-size: 16px;
  font-weight: 400;
  color: #333;
`;

export const Feed = () => {
  return (
    <Banner>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Thumbs, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        effect={'slide'}
        sx={{ display: 'flex' }}
      >
        {sliderItems.map((product) => (
          <SwiperSlide key={product.id}>
            <Wrapper>
              <Image src={product.img} />
              <BannerContent>
                <Text fontSize={{ xs: '9px', sm: '18px' }}>
                  Own your dream parts
                </Text>
                <Title variant="h2">{product.title}</Title>
                <Description fontSize={{ xs: '9px', sm: '18px' }}>
                  {product.desc}
                </Description>
              </BannerContent>
            </Wrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </Banner>
  );
};

const sliderItems = [
  {
    id: 1,
    title: 'BUY',
    img:require('../../ImagesDisplayed/helmet.png'),
    desc: 'best safety partner',
  },
  {
    id: 2,
    title: 'SELL',
    img: require('../../ImagesDisplayed/gloves.png'),
    desc: 'best safety partner',
  },
  {
    id: 3,
    title: 'RENT',
    img: require('../../ImagesDisplayed/parts.png'),
    desc: 'best safety partner',
  },
];
