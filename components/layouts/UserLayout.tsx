'use client'

import { Avatar, Box, Card, Divider, Grid, Link, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, colors } from '@mui/material';
import NextLink from 'next/link'  
import React, { FC, useContext } from 'react'

interface Props {
    title: string
    children: any
    user: any;
}

const routes = [
    {
        name: 'Ajustes de cuenta',
        url:  '/account/profile',
        icon: ''
    },
    {
        name: 'Multimedia',
        url: '/account/multimedia',
        icon: ''
    },
    {
        name: 'Pagos',
        url: '',
        icon: ''
    },
    {
        name: 'Centro de notificaciones',
        url: '',
        icon: ''
    },
    {
        name: 'Centro de ayuda',
        url: '/account/help-center',
        icon:  ''
    }
]

export const UserLayout = ({ title, children, user }: Props) => {

    

  return (
    <>
        <main>
          <Grid container justifyContent="center" gap={ 2.2 }>
            <Grid item sm={ 12 } lg={ 2.3 }>
                <Card>
                    <Stack 
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={ 1.6 }
                        sx={{ py: 2 }}
                    >
                        <Avatar
                            className=''
                            alt="Imagen usaurio"
                            src={ user?.image || "/images/gloupper/default_profile.jpg" }
                        />
                        <Box>
                            <Typography fontSize='12px' color='#9faab7' letterSpacing={ 0 }>Mi Perfil</Typography>
                            <Typography className='' >{ user?.name }</Typography>
                        </Box>
                    </Stack>
                    <Divider sx={{  borderBottom: '1px solid #e5edef' }}/>
                    <List sx={{ pb: 0 }}>
                        {
                            routes.map( ( route, index) => (
                                <NextLink key={ index } href={ route.url } passHref legacyBehavior>
                                    <Link>
                                        <ListItemButton className='' sx={{ color: '#7d7d7d' }}>
                                            <ListItemIcon sx={{ minWidth: 26 }}>
                                                { route.icon }
                                            </ListItemIcon>
                                            <ListItemText 
                                            primary={route.name} 
                                            primaryTypographyProps={{fontSize: 14, fontFamily: 'Poppins,Helvetica,Arial,sans-serif'}}/>
                                        </ListItemButton>
                                    </Link>
                                </NextLink>
                            ))
                        }
                    </List>
                </Card>
            </Grid>
            <Grid item sm={ 12 } lg={ 9 }>
                <Card sx={{ p: '20px', pb: '30px' }}>
                    { children }
                </Card>
            </Grid>
          </Grid>
        </main>
    </>
  )
}
