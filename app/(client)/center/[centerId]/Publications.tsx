import { Post } from '@/components/marketing'
import React from 'react'

export const Publications = ({ publications, currentUser }: any) => {

    console.log(publications)
  return (
    <>
        {
            publications.map(( publication: any, index: number ) => (
                <Post
                    key={index}
                    publication={publication}
                    currentUser={currentUser}

                />
            ))
        }
    </>
  )
}
