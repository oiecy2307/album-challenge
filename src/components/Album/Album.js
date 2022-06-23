import React, {useState, useEffect} from 'react';
import getAlbums from '../../services/getAlbums'
import './Album.css';

function Album () {
    const [albums, setAlbums] = useState([]);
    const list = [];
    

    useEffect(function () {
      const fetchAlbums = async () => {
        const data = await getAlbums();
        setAlbums(Array.from(data));
      }
  
      fetchAlbums();
      
    }, [])


    return (
        
          <div>
      {Object.keys(albums).map((key) => {
         return (
           <div key={key}>
              
              {albums[key].map((dataItem) => {
                let clsName = '';
                
                if(key==0){
                  clsName = 'Album-Ceo'
                }else if(key==1){
                  clsName = 'Album-Sr'
                } else if(key==2) {
                  clsName = 'Album-Jr'
                }
                return (
                  
                 <img className={clsName} key={dataItem.url} src={dataItem.thumbnailUrl}/>

                )
               })}
           </div>
         )
       })}
     </div>
      );
    
  
}

export default Album;