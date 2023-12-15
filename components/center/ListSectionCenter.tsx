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
    currentUser?: any;
    center?: any;
    children?: any;
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

  const tabLabels = ['Información', 'Publicaciones', 'Fotos', 'Videos', 'Comunidad'];
  


const ListSectionCenter: React.FC<ListingInfoProps> = ({
    currentUser,
    center,
    children,
}) => {

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };


  return ( 
    <div className="col-span-12 mb-4 flex flex-col gap-8">
      <Box sx={{ width: '100%', p: 0 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="basic tabs example">
                {tabLabels.map((label, index) => (
                    <Tab label={label} {...a11yProps(index)} key={index} />
                ))}
            </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
           <p>Hola</p>
        </CustomTabPanel>
      </Box>
      <hr />
    </div>
   );
}
 
export default ListSectionCenter