import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import {
  Event as CheckInIcon,
  EventAvailable as CheckOutIcon,
  ChildCare as ChildrenIcon,
  Pets as PetsIcon,
  SmokeFree as SmokingIcon,
  CreditCard as PaymentIcon
} from '@mui/icons-material';

const HotelRules = ({ rules }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#00ADB5', mb: 3 }}>
        House Rules & Policies
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ color: '#00ADB5', mb: 2 }}>
            Check-In/Out
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon sx={{ color: '#00ADB5' }}>
                <CheckInIcon />
              </ListItemIcon>
              <ListItemText 
                primary={`Check-in: ${rules.checkInTime}`}
                primaryTypographyProps={{ color: '#EEEEEE' }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ color: '#00ADB5' }}>
                <CheckOutIcon />
              </ListItemIcon>
              <ListItemText 
                primary={`Check-out: ${rules.checkOutTime}`}
                primaryTypographyProps={{ color: '#EEEEEE' }}
              />
            </ListItem>
          </List>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ color: '#00ADB5', mb: 2 }}>
            Children & Extra Beds
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon sx={{ color: '#00ADB5' }}>
                <ChildrenIcon />
              </ListItemIcon>
              <ListItemText 
                primary={rules.childrenPolicy}
                primaryTypographyProps={{ color: '#EEEEEE' }}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      
      <Divider sx={{ borderColor: '#393E46', my: 3 }} />
      
      <Typography variant="h6" sx={{ color: '#00ADB5', mb: 2 }}>
        Pet Policy
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <PetsIcon sx={{ color: '#00ADB5', mr: 2 }} />
        <Typography color="#EEEEEE">{rules.petPolicy}</Typography>
      </Box>
      
      <Typography variant="h6" sx={{ color: '#00ADB5', mb: 2 }}>
        Smoking Policy
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <SmokingIcon sx={{ color: '#00ADB5', mr: 2 }} />
        <Typography color="#EEEEEE">{rules.smokingPolicy}</Typography>
      </Box>
      
      <Typography variant="h6" sx={{ color: '#00ADB5', mb: 2 }}>
        Payment Methods
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <PaymentIcon sx={{ color: '#00ADB5', mr: 2 }} />
        {rules.paymentMethods.map((method, index) => (
          <Chip 
            key={index} 
            label={method} 
            sx={{ 
              backgroundColor: '#393E46',
              color: '#EEEEEE',
              border: '1px solid #00ADB5'
            }} 
          />
        ))}
      </Box>
      
      <Divider sx={{ borderColor: '#393E46', my: 3 }} />
      
      <Typography variant="h6" sx={{ color: '#00ADB5', mb: 2 }}>
        Cancellation Policy
      </Typography>
      <Typography color="#EEEEEE">{rules.cancellationPolicy}</Typography>
    </Box>
  );
};

export default HotelRules;