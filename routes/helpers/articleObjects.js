module.exports = function(arr1, arr2, arr3) {
  const filteredNews = []
  // map through all three arrays mapping data to new objects
  arr1.map(item => {
    // push new objects to master array
    filteredNews.push(
      {	
      title: item.webTitle, // title
      pub_date: item.webPublicationDate, // pubDate
      image: item.fields.thumbnail, // image
      url: item.webUrl, // url
      abstract: item.webTitle, // abstract
      }
    )
  })

  arr2.map(item => {
    filteredNews.push(
      {
        title: item.headline.main,
        pub_date: item.pub_date,
        image: item.multimedia[17].url,
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
        image: item.urlToImage,
        url: item.url,
        abstract: item.content
      }
    )
  })

  return filteredNews
}