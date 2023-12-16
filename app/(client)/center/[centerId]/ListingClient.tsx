'use client';

import { useState } from "react";

import { SafeUser } from "@/app/types";

import { Container } from "@/components/layouts";

import { HeadSection } from "@/components/center/section";
import { ReviewModal } from "@/components/center/modals";;
import { Carousel } from "@/components/ui/swipper";
import { Box, Tab, Tabs } from "@mui/material";
import { Information } from "./Information";
import { Publications } from "./Publications";
import { TabPanel, classProps } from "@/components/ui/tabs";
import { Heading } from "@/components/ui/headers";


interface ListingClientProps {
  reservations?: any[] // SafeReservation[];
  listing: any & { //SafeListing
    user: SafeUser;
  };
  interesting: any;
  reviews?: any | null;
  publications?: any | null;
  currentUser?: SafeUser | null;
}


const tabLabels = ['Información', 'Publicaciones', 'Fotos', 'Videos', 'Comunidad'];


const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  interesting,
  reservations = [],
  currentUser,
  reviews,
  publications
}) => {


  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return ( 
    <Container>
      <div 
        className="
          max-w-screen  
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">

          <HeadSection
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.city}
            images={listing.images}
            id={listing.id}
            currentUser={currentUser}
          />

          <div className="col-span-12 mb-4 flex flex-col gap-8 mt-3">
            <hr />
            <Box sx={{ width: '100%', p: 0 }}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs 
                  value={value} 
                  onChange={handleChange} 
                  aria-label="basic tabs example">
                      {tabLabels.map((label, index) => (
                          <Tab label={label} {...classProps(index)} key={index} />
                      ))}
                  </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                  <Information
                    listing={listing}
                    reservations={reservations}
                    currentUser={currentUser}
                    reviews={reviews}
                  />
              </TabPanel>

              <TabPanel value={value} index={1}>
                 <Publications 
                  publications={publications}
                  currentUser={currentUser}
                 />
              </TabPanel>

            </Box>
            <hr />
          </div>
          

           {/* Section view mas */}
          <div>
              <hr />
              <br />
              <Heading
                  title='Estos podrian initeresarte'
                  subtitle='Cerca de tu interes'
              />
              <div className="h-74">
                  <Carousel data={ interesting }/>
              </div>  
              <br />
              <hr /> 
          </div>

        </div>
      </div>

      <ReviewModal center={ listing }/>
    </Container>
   );
}
 
export default ListingClient;
