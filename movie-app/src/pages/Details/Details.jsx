import React from 'react'
import DetailsBanner from './DetailsBanner'
import { useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import Cast from './Cast';



export default function Details() {
  const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(
        `/${mediaType}/${id}/credits`
    );
    // console.log(credits?.data.cast)
   
       
  
  return (
    <>
    <DetailsBanner crew={credits?.data?.crew} />
    <Cast  data={credits?.data?.cast} loading={creditsLoading}/>
    
    </>
    
  )
}
