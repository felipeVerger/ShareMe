import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../../client';
import { feedQuery, searchQuery } from '../../utils/data';
import MasonryLayout from '../../components/MasonryLayout/MasonryLayout';
import Spinner from '../../components/Spinner/Spinner'

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true); 
    if(categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        });
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
    }
  }, [categoryId])

  if(loading) return <Spinner message='We are adding new ideas to your feed!'/>
  if(!pins?.length) return <h2 className='font-bold text-red-500 flex justify-center mt-20'>No pins available</h2>
  return (
    <div>
      {pins && <MasonryLayout pins={pins}/>}
    </div>
  )
}

export default Feed