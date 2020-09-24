module.exports = function(arr1, arr2, arr3) {
  const filteredNews = []
  // map through all three arrays mapping data to new objects
  arr1.map(item => {

    // check for undefined properties
    if(!item.hasOwnProperty('item.webTitle' || 'item.webPublicationDate' || 'item.fields.thumbnail' || 'item.web_url' || 'item.webTitle')) {
      return
    }

    // push new objects to master array
    filteredNews.push(
      {	
      title: item.webTitle, // title
      pub_date: item.webPublicationDate,
      img: item.fields.thumbnail, // image
      url: item.webUrl,
      abstract: item.webTitle, 
      }
    )
  
  })

  arr2.map(item => {
    if(!item.hasOwnProperty('item.multimedia[17].url' || 'item.headline.main' || 'item.pub_date' || 'item.web_url' || 'item.abstract')) {
      return
    }
    filteredNews.push(
      {
        title: item.headline.main,
        pub_date: item.pub_date,
        img: item.multimedia[17].url,
        url: item.web_url,
        abstract: item.abstract
      }
    )
  })

  arr3.map(item => {
    
    filteredNews.push(
      {
        title: item.title,
        pub_date: item.publishedAt,
        img: item.urlToImage,
        url: item.url,
        abstract: item.content
      }
    )
  })

  return filteredNews
}