

import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import CardService from "../cards/CardService";
import { TabPanel, classProps } from "../../ui/tabs";
  
interface ServicesSectionProps {
  currentUser: any;
  center: any;
}


const tabLabels = ['Atracciones', 'Hospedaje', 'Restaurante', 'Tours'];
  

export const ServicesSection: React.FC<ServicesSectionProps> = ({
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
                    <Tab label={label} {...classProps(index)} key={index} />
                ))}
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            {renderListings(center.attractions)}
        </TabPanel>
        <TabPanel value={value} index={1}>
            {renderListings(center.accommodations)}
        </TabPanel>
        <TabPanel value={value} index={2}>
            {renderListings(center.foods)}
        </TabPanel>
        <TabPanel value={value} index={3}>
            {renderListings(center.tours)}
        </TabPanel>
      </Box>
      <hr />
    </div>
   );
}
 