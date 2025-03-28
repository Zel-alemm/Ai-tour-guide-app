import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Availability = ({ rooms }) => {
  const [checkInDate, setCheckInDate] = useState(dayjs().add(1, 'day'));
  const [checkOutDate, setCheckOutDate] = useState(dayjs().add(3, 'days'));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState('');

  const handleSearch = () => {
    // In a real app, this would fetch availability from an API
    console.log('Searching for availability...');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#00ADB5', mb: 3 }}>
        Check Availability
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Check-in Date"
              value={checkInDate}
              onChange={(newValue) => setCheckInDate(newValue)}
              minDate={dayjs()}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  fullWidth 
                  sx={{ 
                    '& .MuiInputBase-root': { color: '#EEEEEE' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#00ADB5' }
                  }} 
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Check-out Date"
              value={checkOutDate}
              onChange={(newValue) => setCheckOutDate(newValue)}
              minDate={checkInDate}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  fullWidth 
                  sx={{ 
                    '& .MuiInputBase-root': { color: '#EEEEEE' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#00ADB5' }
                  }} 
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#EEEEEE' }}>Adults</InputLabel>
            <Select
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              label="Adults"
              sx={{ 
                color: '#EEEEEE',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#00ADB5' }
              }}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <MenuItem key={num} value={num}>{num}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#EEEEEE' }}>Children</InputLabel>
            <Select
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              label="Children"
              sx={{ 
                color: '#EEEEEE',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#00ADB5' }
              }}
            >
              {[0, 1, 2, 3, 4].map(num => (
                <MenuItem key={num} value={num}>{num}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={2}>
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleSearch}
            sx={{ 
              height: '56px',
              backgroundColor: '#00ADB5',
              '&:hover': { backgroundColor: '#00838F' }
            }}
          >
            Check
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: '#393E46', my: 3 }} />

      <Typography variant="h5" sx={{ color: '#00ADB5', mb: 2 }}>
        Available Rooms
      </Typography>
      
      <TableContainer component={Paper} sx={{ backgroundColor: '#393E46' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#00ADB5' }}>
              <TableCell sx={{ color: '#EEEEEE' }}>Room Type</TableCell>
              <TableCell sx={{ color: '#EEEEEE' }}>Capacity</TableCell>
              <TableCell sx={{ color: '#EEEEEE' }}>Price/Night</TableCell>
              <TableCell sx={{ color: '#EEEEEE' }}>Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id} sx={{ '&:hover': { backgroundColor: '#2D333B' } }}>
                <TableCell sx={{ color: '#EEEEEE' }}>{room.type}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>{room.capacity}</TableCell>
                <TableCell sx={{ color: '#EEEEEE' }}>${room.price}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    onClick={() => setSelectedRoom(room.id)}
                    sx={{ 
                      color: selectedRoom === room.id ? '#00ADB5' : '#EEEEEE',
                      borderColor: selectedRoom === room.id ? '#00ADB5' : '#EEEEEE',
                      '&:hover': { borderColor: '#00ADB5' }
                    }}
                  >
                    {selectedRoom === room.id ? 'Selected' : 'Select'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedRoom && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              backgroundColor: '#00ADB5',
              '&:hover': { backgroundColor: '#00838F' },
              px: 4,
              py: 2
            }}
          >
            Book Now
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Availability;