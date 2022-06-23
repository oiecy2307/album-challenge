const apiUrl = 'https://jsonplaceholder.typicode.com/photos';
const topAlbumString = '?_sort=albumId&_order=desc&_limit=1';

export default async function getAlbums() {
    let top3Albums = [];
    let top3Ids = []; 

    //first we obtain the top albumId value from the API, so we can make a list with the 2 numbers behind the top albumId
    const top1Id = await fetch(apiUrl+topAlbumString);
    const topId1Data = await top1Id.json();
    let top1 = Number.parseInt(topId1Data[0].albumId);
    top3Ids.push(top1);

    const top2Id = await fetch(apiUrl+'?albumId_ne='+top1+'&_sort=albumId&_order=desc&_limit=1');
    const topId2Data = await top2Id.json();
    let top2 = Number.parseInt(topId2Data[0].albumId);
    top3Ids.push(top2);

    const top3Id = await fetch(apiUrl+'?albumId_ne='+top1+'&albumId_ne='+top2+'_sort=albumId&_order=desc&_limit=1');
    const topId3Data = await top3Id.json();
    let top3 = Number.parseInt(topId3Data[0].albumId);
    top3Ids.push(top3);
    
    
    //Then we obtain the 3 top albums according to the albumId obtained before
    for (let x of top3Ids){
        const album = await fetch(apiUrl+'?albumId='+x+'&_sort=id&_order=desc&_limit=2');
        const fetchedAlbum = await album.json();
        top3Albums.push(JSON.parse(JSON.stringify((fetchedAlbum))));
    }
        return top3Albums;

        
}


