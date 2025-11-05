import { Box, CardMedia, Typography, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

const RestroDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fav, setFav] = useState(false);

  const restaurant = location.state?.restaurant || {
    restaurant_name: 'Lazy Bear',
    address_complete: 'Connaught Place, New Delhi',
  };

  const imageUrl =
    location.state?.imageUrl ||
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=60';

  const extractCity = (addr) => {
    if (!addr || addr === 'null') {
      return 'Old Delhi';
    }
    const parts = addr.split(',');
    return parts.length >= 2
      ? parts.slice(-2).join(', ').trim()
      : 'South Delhi';
  };

  const cityName = extractCity(restaurant.address_complete);

  const toggleFavorite = () => {
    console.log('Toggling favorite:', !fav);
    setFav(!fav);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 1.5,
          zIndex: 100,
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            p: 0.8,
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 22, color: '#1a1a1a' }} />
        </IconButton>
        <IconButton
          onClick={toggleFavorite}
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            p: 0.8,
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
          }}
        >
          {fav && <FavoriteIcon sx={{ fontSize: 22, color: '#ff6b6b' }} />}
          {!fav && (
            <FavoriteBorderIcon sx={{ fontSize: 22, color: '#1a1a1a' }} />
          )}
        </IconButton>
      </Box>
      <CardMedia
        component='img'
        image={imageUrl}
        alt={restaurant.restaurant_name}
        sx={{
          width: '100%',
          height: { xs: 570, md: 560 },
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          bgcolor: '#fff',
          borderRadius: '24px 24px 0 0',
          mt: -3,
          position: 'relative',
          p: 3,
          pt: 2.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: '700',
              color: '#1a1a1a',
              flex: 1,
            }}
          >
            {restaurant.restaurant_name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.4,
              bgcolor: '#f5f5f5',
              px: 1.2,
              py: 0.5,
              borderRadius: '8px',
            }}
          >
            <Typography
              sx={{ fontSize: 14, fontWeight: '700', color: '#1a1a1a' }}
            >
              ★
            </Typography>
            <Typography
              sx={{ fontSize: 14, fontWeight: '700', color: '#1a1a1a' }}
            >
              4.5
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: 14,
            color: '#757575',
            fontWeight: '400',
            mb: 1.5,
          }}
        >
          {cityName}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.6,
            mb: 2.5,
          }}
        >
          <Box
            sx={{
              width: 20,
              height: 20,
              bgcolor: '#ffe5e0',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: 12 }}>🔥</Typography>
          </Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: '500',
              color: '#c76f51',
            }}
          >
            4 Offers Trending
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: 14,
            color: '#666',
            lineHeight: 1.7,
            fontWeight: '400',
            mb: 3,
          }}
        >
          Our delicate vanilla cake swirled with chocolate and filled with mocha
          chocolate chip cream and a layer of dark chocolate ganache
        </Typography>
      </Box>
    </Box>
  );
};

export default RestroDetail;
