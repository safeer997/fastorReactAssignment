import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import RestroCard from '../components/RestroCard.jsx';
import axios from 'axios';

const swiperSlidesData = [
  {
    title: 'VEGGIE FRIENDLY\nEATERIES',
    chipLabel: 'TRY NOW',
    bgImage:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'TOP RATED\nCAFES',
    chipLabel: 'EXPLORE',
    bgImage:
      'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'HOT & SPICY \nPICKS',
    chipLabel: 'SHOW ME',
    bgImage:
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'DESTINATION \nDESSERTS',
    chipLabel: 'INDULGE',
    bgImage:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=60',
  },
];

const highlightRestro = [
  {
    name: 'Spice Symphony',
    place: 'Connaught Place, Delhi',
    image:
      'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=350&q=35',
  },
  {
    name: 'The Curry Leaf',
    place: 'Hauz Khas, Delhi',
    image:
      'https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&w=350&q=35',
  },
  {
    name: 'Green Bowl',
    place: 'Khan Market, Delhi',
    image:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=350&q=35',
  },
  {
    name: 'Chaat Corner',
    place: 'Lajpat Nagar, Delhi',
    image:
      'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=350&q=35',
  },
  {
    name: 'Masala Magic',
    place: 'DLF Phase 4, Gurugram',
    image:
      'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=350&q=35',
  },
  {
    name: 'The Dessert Den',
    place: 'Sector 18, Noida',
    image:
      'https://images.pexels.com/photos/3026803/pexels-photo-3026803.jpeg?auto=compress&cs=tinysrgb&w=350&q=35',
  },
  {
    name: 'Urban Tadka',
    place: 'South Extension, Delhi',
    image:
      'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=350&q=35',
  },
  {
    name: 'Noodle Nirvana',
    place: 'Cyber Hub, Gurugram',
    image:
      'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=350&q=35',
  },
  {
    name: 'Bread & Butter',
    place: 'SDA Market, Delhi',
    image:
      'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=350&q=35',
  },
];

const imagePool = [
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=50',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=50',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&q=50',
  'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=400&q=50',
  'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=400&q=50',
  'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=400&q=50',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=400&q=50',
];

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');
  const [restaurantImages, setRestaurantImages] = useState({});

  async function fetchRestaurants() {
    // console.log('Fetching restaurants');
    const token = localStorage.getItem('fastorToken');
    const userData = localStorage.getItem('fastorUser');

    if (!token) {
      // console.log('No token found');
      return toast.error('No token found. Please login.');
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    try {
      setLoading(true);
      const response = await axios.get(
        'https://staging.fastor.ai/v1/m/restaurant?city_id=118&&',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log('Restaurant response:', response);

      if (response.data.status === 'Success') {
        const restaurantData = response.data.data.results;
        setRestaurants(restaurantData);
        const imageMap = {};
        for (let i = 0; i < restaurantData.length; i++) {
          const restaurant = restaurantData[i];
          const randomIndex = Math.floor(Math.random() * imagePool.length);
          const randomImage = imagePool[randomIndex];
          imageMap[restaurant.restaurant_id] = randomImage;
        }
        setRestaurantImages(imageMap);
      } else {
        toast.error(response.data.message || 'Failed to load restaurants');
      }
    } catch (error) {
      toast.error('Failed to load restaurants');
      // console.error('Error fetching:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const userName = user?.user_name?.split(' ')[0] || 'Karan';

  return (
    <Box sx={{ pb: 3, bgcolor: '#fff' }}>
      <ToastContainer position='top-center' />
      <Box sx={{ p: 2, bgcolor: '#f5f5f5' }}>
        <Typography
          sx={{ fontSize: '12px', color: '#999', mb: 0.5, fontWeight: '400' }}
        >
          Pre Order From 📍
        </Typography>
        <Typography
          sx={{ fontSize: '16px', fontWeight: '600', color: '#1a1a1a' }}
        >
          Connaught Place
        </Typography>
      </Box>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#1a1a1a',
              mb: 0.3,
            }}
          >
            {userName}
          </Typography>
          <Typography
            sx={{ fontSize: '13px', color: '#999', fontWeight: '400' }}
          >
            Let's explore this evening
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Card
            sx={{
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#ff6b6b',
              cursor: 'pointer',
              borderRadius: '8px',
              boxShadow: 'none',
              border: 'none',
            }}
          >
            <Typography sx={{ fontSize: '22px' }}>⚙️</Typography>
          </Card>
          <Card
            sx={{
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#4a90e2',
              cursor: 'pointer',
              borderRadius: '8px',
              boxShadow: 'none',
              border: 'none',
            }}
          >
            <Typography sx={{ fontSize: '22px' }}>💼</Typography>
          </Card>
        </Box>
      </Box>
      <Box
        sx={{
          p: 2,
          pt: 1,
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {['Offers', 'Wallet'].map((cat) => (
          <Chip
            key={cat}
            label={cat}
            sx={{
              fontSize: '13px',
              fontWeight: '500',
              color: '#999',
              bgcolor: 'transparent',
              border: '1px solid #e0e0e0',
              cursor: 'pointer',
              height: '32px',
              '&:hover': { bgcolor: '#f5f5f5' },
            }}
          />
        ))}
      </Box>
      {/* <Box sx={{ p: 2, pt: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1.5,
          }}
        >
          <Typography
            sx={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a' }}
          >
            Your taste
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              color: '#ff6b6b',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            see all →
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {highlightRestro.map((item, index) => (
            <Card
              key={index}
              sx={{
                minWidth: '135px',
                borderRadius: '10px',
                overflow: 'hidden',
                bgcolor: '#f0f0f0',
                cursor: 'pointer',
                boxShadow: 'none',
                border: 'none',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '95px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px',
                  bgcolor: '#e8e8e8',
                }}
              >
                🍰
              </Box>
              <CardContent sx={{ p: 1.2 }}>
                <Typography
                  sx={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    mb: 0.4,
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{ fontSize: '11px', color: '#999', fontWeight: '400' }}
                >
                  {item.place}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box> */}

      <Box sx={{ p: 2, pt: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1.5,
          }}
        >
          <Typography
            sx={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a' }}
          >
            Your taste
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              color: '#ff6b6b',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            see all →
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {highlightRestro.map((item, index) => (
            <Box
              key={index}
              sx={{
                minWidth: '160px',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '120px',
                  backgroundImage: `url('${item.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '12px 12px 0 0',
                }}
              />
              <Box
                sx={{
                  bgcolor: '#f5f5f5',
                  p: 1.5,
                  borderRadius: '0 0 12px 12px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    mb: 0.3,
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: '#999',
                    fontWeight: '400',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.place}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ px: 2, py: 1 }}>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000 }}
          spaceBetween={0}
          slidesPerView={1}
        >
          {swiperSlidesData.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  height: '200px',
                  backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%), url('${slide.bgImage}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 2.5,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ color: 'white', zIndex: 10, position: 'relative' }}>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: '700',
                      mb: 1.2,
                      lineHeight: '1.2',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Chip
                    label={slide.chipLabel}
                    sx={{
                      bgcolor: '#9ACD32',
                      color: '#1a1a1a',
                      fontWeight: '700',
                      height: '28px',
                      fontSize: '12px',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 5,
                  }}
                ></Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box sx={{ p: 2, pt: 2 }}>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1a1a1a',
            mb: 1.5,
          }}
        >
          Popular Ones
        </Typography>

        {loading && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <CircularProgress size={40} sx={{ color: '#ff6b6b' }} />
          </Box>
        )}

        {!loading && restaurants.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {restaurants.map((res) => (
              <RestroCard
                key={res.restaurant_id}
                res={res}
                imageUrl={restaurantImages[res.restaurant_id]}
              />
            ))}
          </Box>
        )}

        {!loading && restaurants.length === 0 && (
          <Typography
            sx={{ textAlign: 'center', color: '#999', py: 4, fontSize: '14px' }}
          >
            No restaurants availabe
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Home;
