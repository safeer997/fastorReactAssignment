import { Card, CardMedia, CardContent, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RestroCard = ({ res, imageUrl, rating }) => {
  const navigate = useNavigate();

  const onCardClick = () => {
    // console.log('Navigating to restaurant:', res.restaurant_id);
    navigate(`/restaurant/${res.restaurant_id}`, {
      state: {
        restaurant: res,
        imageUrl: imageUrl,
      },
    });
  };

  const extractCity = (addr) => {
    if (!addr || addr === 'null') {
      return 'Old Delhi';
    }
    const parts = addr.split(',');
    return parts.length >= 2 ? parts.slice(-2).join(', ').trim() : 'Location';
  };

  const cityName = extractCity(res.address_complete);

  return (
    <Card
      onClick={onCardClick}
      sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: 'none',
        background: '#fff',
        p: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
        }}
      >
        <CardMedia
          component='img'
          image={imageUrl}
          alt={res.restaurant_name}
          sx={{
            width: 124,
            height: 128,
            objectFit: 'cover',
            borderRadius: '14px',
            display: 'block',
            flexShrink: 0,
            marginLeft: '12px',
            '@media (min-width: 1024px)': {
              width: 200,
              height: 180,
            },
          }}
        />

        <CardContent
          sx={{
            flex: 1,
            py: 0,
            px: 2,
            minHeight: 130,
            height: 130,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '@media (min-width: 1024px)': {
              px: 3,
              minHeight: 180,
              height: 180,
            },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: '700',
                color: '#3b3b3b',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                mt: 0,
                '@media (min-width: 1024px)': {
                  fontSize: 22,
                },
              }}
            >
              {res.restaurant_name}
            </Typography>
            <Typography
              sx={{
                fontSize: 13,
                color: '#9e9e9e',
                fontWeight: 400,
                '@media (min-width: 1024px)': {
                  fontSize: 15,
                },
              }}
            >
              Cakes, Pastry, Pastas
            </Typography>
            <Typography
              sx={{
                fontSize: 13,
                color: '#9e9e9e',
                fontWeight: 400,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                '@media (min-width: 1024px)': {
                  fontSize: 15,
                },
              }}
            >
              {cityName}
            </Typography>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 500,
                color: '#c76f51',
                display: 'flex',
                alignItems: 'center',
                '@media (min-width: 1024px)': {
                  fontSize: 15,
                },
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  display: 'inline-block',
                  marginRight: '3px',
                  background:
                    "url(\"data:image/svg+xml,%3csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M8 1.333A6.666 6.666 0 1 0 14.667 8 6.674 6.674 0 0 0 8 1.333Zm.133 10.033a1 1 0 0 1-1.299.353.533.533 0 0 1-.2-.14l-.964-1.013a.533.533 0 0 1 0-.728l4.013-4.175a.534.534 0 0 1 .785 0l.645.671a.534.534 0 0 1 0 .728L8.8 11.365a1 1 0 0 1-.534.001Z' fill='%23c76f51'/%3e%3c/svg%3e\")",
                  backgroundSize: '16px 16px',
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#c76f51',
                }}
              >
                4 Offers Trending
              </span>
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'end',
              mb: 0,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 1,
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#3b3b3b',
                  fontSize: 15,
                  fontWeight: 700,
                  '@media (min-width: 1024px)': {
                    fontSize: 17,
                  },
                }}
              >
                <span style={{ marginRight: 4 }}>★</span>
                <span>4.5</span>
              </Box>
              <Typography
                sx={{
                  fontSize: 11,
                  color: '#9e9e9e',
                  fontWeight: 400,
                  mb: 0,
                  '@media (min-width: 1024px)': {
                    fontSize: 12,
                  },
                }}
              >
                Popularity
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#3b3b3b',
                  '@media (min-width: 1024px)': {
                    fontSize: 20,
                  },
                }}
              >
                $ 200
              </Typography>
              <Typography
                sx={{
                  fontSize: 11,
                  color: '#9e9e9e',
                  fontWeight: 400,
                  mb: 0,
                  '@media (min-width: 1024px)': {
                    fontSize: 12,
                  },
                }}
              >
                Cost for two
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default RestroCard;
