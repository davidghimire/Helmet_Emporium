import React from 'react';
import { styled, Box, Stack } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const SocialBox = styled(Box)({
  display: 'flex',
  gap: 10,
  color: 'white',
});
const Text = styled('div')`
  font-size: 16px;
  font-weight: 400;
  color: #fff;
`;
const Terms = styled('div')`
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  margin-left: 33%;
`;
const Footer = () => {
  return (
    <Box
      sx={{ background: '#FF4B3E', height: '300px' }}
      mt={5}

      // direction={{ xs: 'row', sm: 'row' }}
    >
      <Stack direction={{ xs: 'row', md: 'row' }} p={7}>
        <Box flex={2}>
          <Text color={'white'}>Contact Us</Text>
          <Text color={'white'}>Contact Us</Text>
          <Text color={'white'}>Contact Us</Text>
          <Text color={'white'}>Contact Us</Text>
        </Box>
        <Box flex={2}>
          <Text color={'white'}>Data Policy</Text>
          <Text color={'white'}>Data Safty</Text>
          <Text color={'white'}>Email</Text>
        </Box>
        <Box>
          <Text color={'white'}>Follow Us</Text>
          <SocialBox>
            <Facebook />
            <Instagram />
            <Twitter />
          </SocialBox>
        </Box>
      </Stack>
      <hr />
      <Terms variant={'body2'}>
        &copy;{new Date().getFullYear()} Helmet Emporium | All right reserved | Terms
        of Service | Privacy
      </Terms>
    </Box>
  );
};

export default Footer;
