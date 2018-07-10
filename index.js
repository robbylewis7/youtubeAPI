const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      q: searchTerm,
      per_page: 5,
      part: 'snippet',
      key: 'AIzaSyBir-Yi1pQ5tQmGjZjuExJ-c4wKjbA-1sY'
    },
    type:"GET",
    success: callback,
    dataType: 'JSON'
  };

  $.ajax(settings);
}

function renderResult(item) {
  return `
    <div class = "videoReturn">
       <iframe src="https://www.youtube.com/embed/${item.id.videoId}" title="video" allowfullscreen</iframe>
    </div>
  `;
}

function displayYoutubeSearchData(data) {
  console.log(data.items[0])
  const results = data.items.map( item => renderResult(item));
  // console.log(results);
  $('.js-search-results').html(results);
}

function watchSubmit() {
   
  $('.js-search-form').submit(event => {
    // console.log('clicked')
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);
  });
}


$(watchSubmit);
