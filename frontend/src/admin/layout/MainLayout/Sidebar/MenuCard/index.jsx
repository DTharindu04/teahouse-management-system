import PropTypes from 'prop-types';
import { memo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { linearProgressClasses } from '@mui/material/LinearProgress';

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

function LinearProgressWithLabel({ value, ...others }) {
  return (
    <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
      <Grid>
        <Grid container sx={{ justifyContent: 'space-between' }}>
          <Grid>
            <Typography variant="h6" sx={{ color: 'primary.800' }}>
              Health
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="h6" color="inherit">{`${Math.round(value)}%`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <LinearProgress
          aria-label="System Health"
          variant="determinate"
          value={value}
          {...others}
          sx={{
            height: 10,
            borderRadius: 30,
            [`&.${linearProgressClasses.colorPrimary}`]: {
              bgcolor: 'background.paper'
            },
            [`& .${linearProgressClasses.bar}`]: {
              borderRadius: 5,
              bgcolor: 'primary.dark'
            }
          }}
        />
      </Grid>
    </Grid>
  );
}

LinearProgressWithLabel.propTypes = { value: PropTypes.number, others: PropTypes.any };

// ==============================|| SIDEBAR - MENU CARD ||============================== //

function MenuCard() {
  const theme = useTheme();

  return (
    <Card
      sx={{
        bgcolor: 'primary.light',
        mb: 2,
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          width: 157,
          height: 157,
          bgcolor: 'primary.200',
          borderRadius: '50%',
          top: -105,
          right: -96
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <List disablePadding sx={{ pb: 1 }}>
          <ListItem disableGutters disablePadding>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.largeAvatar,
                  color: 'primary.main',
                  bgcolor: 'background.paper'
                }}
              >
                <TableChartOutlinedIcon fontSize="inherit" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle1" sx={{ color: 'primary.800' }}>
                  System Health
                </Typography>
              }
              secondary={<Typography variant="caption"> Uptime: 98.5%</Typography>}
            />
          </ListItem>
        </List>
        <LinearProgressWithLabel value={98.5} />
      </Box>
    </Card>
  );
}

export default memo(MenuCard);
