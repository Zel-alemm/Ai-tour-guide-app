import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider
} from '@mui/material';
import {
  Wifi,
  Pool,
  Restaurant,
  LocalLaundryService,
  AcUnit,
  LocalParking,
  FitnessCenter,
  Tv,
  Kitchen,
  Bathtub
} from '@mui/icons-material';

const Facility = ({ facilities }) => {
  // Group facilities by category
  const facilityCategories = {
    'Internet': facilities.filter(f => f.category === 'Internet'),
    'Pool & Wellness': facilities.filter(f => f.category === 'Pool & Wellness'),
    'Food & Drink': facilities.filter(f => f.category === 'Food & Drink'),
    'Services': facilities.filter(f => f.category === 'Services'),
    'Room Amenities': facilities.filter(f => f.category === 'Room Amenities'),
    'General': facilities.filter(f => f.category === 'General')
  };

  const iconMap = {
    'Free WiFi': <Wifi />,
    'Swimming Pool': <Pool />,
    'Restaurant': <Restaurant />,
    'Laundry Service': <LocalLaundryService />,
    'Air Conditioning': <AcUnit />,
    'Parking': <LocalParking />,
    'Fitness Center': <FitnessCenter />,
    'TV': <Tv />,
    'Kitchen': <Kitchen />,
    'Private Bathroom': <Bathtub />
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#00ADB5', mb: 3 }}>
        Hotel Facilities
      </Typography>
      
      <Grid container spacing={4}>
        {Object.entries(facilityCategories).map(([category, items]) => (
          items.length > 0 && (
            <Grid item xs={12} md={6} key={category}>
              <Typography variant="h6" sx={{ mb: 2, color: '#00ADB5' }}>
                {category}
              </Typography>
              <List dense>
                {items.map((facility, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon sx={{ color: '#00ADB5' }}>
                        {iconMap[facility.name] || <Wifi />}
                      </ListItemIcon>
                      <ListItemText 
                        primary={facility.name} 
                        secondary={facility.description}
                        primaryTypographyProps={{ color: '#EEEEEE' }}
                        secondaryTypographyProps={{ color: '#AAAAAA' }}
                      />
                    </ListItem>
                    {index < items.length - 1 && <Divider component="li" sx={{ borderColor: '#393E46' }} />}
                  </React.Fragment>
                ))}
              </List>
            </Grid>
          )
        ))}
      </Grid>
    </Box>
  );
};

export default Facility;