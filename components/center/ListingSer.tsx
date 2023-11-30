'use client';

import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import CardService from "./cards/CardService";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
  
interface ListingInfoProps {
    currentUser: any;
    center: any;
}

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const tabLabels = ['Atracciones', 'Hospedaje', 'Restaurante', 'Tours'];
  


const ListingSer: React.FC<ListingInfoProps> = ({
    currentUser,
    center
}) => {

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const renderListings = (listings: any[]) => (
        <div
          className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-4
          2xl:grid-cols-5
          gap-5
          "
          style={{ maxHeight: '100vh', overflowY: 'auto' }}
        >
          {listings.map((listing: any) => (
            <CardService
              key={listing.id}
              data={listing}
              actionId={listing.id}
              currentUser={currentUser}
            />
          ))}
        </div>
      );

  return ( 
    <div className="col-span-12 mb-4 flex flex-col gap-8">
      <Box sx={{ width: '100%', p: 0 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
            value={value} 
            onChange={handleChange} 
            centered 
            // variant="scrollable"
            // scrollButtons
            // allowScrollButtonsMobile
            aria-label="basic tabs example">
                {tabLabels.map((label, index) => (
                    <Tab label={label} {...a11yProps(index)} key={index} />
                ))}
            </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
            {renderListings(center.attractions)}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            {renderListings(center.accommodations)}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
            {renderListings(center.foods)}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
            {renderListings(center.tours)}
        </CustomTabPanel>
      </Box>
      <hr />
    </div>
   );
}
 
export default ListingSer;