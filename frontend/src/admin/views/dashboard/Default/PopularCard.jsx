import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TotalIncomeDarkCard from '../../../ui-component/cards/TotalIncomeDarkCard';
import TotalIncomeLightCard from '../../../ui-component/cards/TotalIncomeLightCard';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from '../../../ui-component/cards/MainCard';
import SkeletonPopularCard from '../../../ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from '../../../store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

export default function PopularCard({ isLoading }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              
              <Grid size={12} >
                <BajajAreaChartCard />
                <TotalIncomeDarkCard isLoading={isLoading} />
                <TotalIncomeLightCard
                  {...{
                    isLoading: isLoading,
                    total: 203,
                    label: 'Total Income',
                    icon: <StorefrontTwoToneIcon fontSize="inherit" />
                  }}
                />
              </Grid>
              <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
          <TotalIncomeDarkCard isLoading={isLoading} />
          </Grid>
        
          
        </Grid>
      </Grid>
             
                
             
            </Grid>
          </CardContent>
          
        </MainCard>
      )}
    </>
  );
}

PopularCard.propTypes = { isLoading: PropTypes.bool };
