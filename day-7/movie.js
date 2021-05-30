var ratings = {"G": 0, "PG": 0, "PG-13": 13, "R": 18};
var genres = movies.map(function(movie) {return movie.genres})
    .reduce(function(a, b) {return a.concat(b)}).sort()
    .filter(function(item, pos, arr) {return !pos || item != arr[pos - 1];});


/**
 * @param {object} object
 * @return {boolean} whether the object matches the schema for a movie
 */
function isMovie(object) {
  return typeof object.title === "string"
      && typeof object.year === "number"
      && object.genres instanceof Array
      && object.genres.every(function(i) {return typeof i === "string"})
      && Object.keys(ratings).indexOf(object.rating) > -1
      && typeof object.director === "string"
      && object.stars instanceof Array
      && object.stars.every(function(i) {return typeof i === "string"})
      && Object.keys(object).length === 6;
}

function isInMovieDatabase(movie) {
  var matchingMovies = movies.filter(function(otherMovie) {
    return equalsMovie(movie, otherMovie);
  });

  return matchingMovies.length > 0;
};

/**
 * @param {number} year
 * @return {object} array of movies made in a given year
 */
function allMoviesMadeInYear(year) {
  return movies.filter(function(o) {return o.year === year;});
}

/**
 * @param {number} startYear
 * @param {number} endYear
 * @return {object} array of movies made in a given range of years
 */
function allMoviesMadeInYearRange(movieArr, startYear, endYear) {
  return movieArr.filter(function(o) {
    return o.year >= startYear && o.year <= endYear;
  }).sort(compareMoviesByYear);
}

/**
 * @param {string} name
 * @return {object} array of movies made by a given director
 */
function allMoviesByDirector(movieArr, name) {
  return movieArr.filter(function(o) {
    return o.director === name;
  }).sort(compareMoviesByYear);
}

/**
 * @param {string} name
 * @return {object} array of movies made by a given actor
 */
function allMoviesWithActor(movieArr, name) {
  return movieArr.filter(function(o) {
    return o.stars.indexOf(name) > -1;
  }).sort(compareMoviesByYear);
}

/**
 * @param {string} searchString
 * @return {object} array of movies made by a given actor
 */
function searchMoviesByTitle(searchString) {
  return movies.filter(function(o) {
    return o.title.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
  }).sort(compareMoviesByYear);
}

function compareMoviesByYear(a, b) {
  return a.year - b.year;
}

function compareMoviesByTitle(a, b) {
  if (a.title < b.title) {
    return -1;
  } else if (a.title > b.title) {
    return 1
  } else {
    return 0;
  }
}

function equalsMovie(a, b) {
  return a.title === b.title && a.director === b.director;
}

function movieIsGenre(movie, genres) {
  var intersection = movie.genres.filter(function(genre) {
    return genres.indexOf(genre) != -1;
  });
  return intersection.length > 0;
}

/**
 * @param {object} movie
 * @return {number} minimum age which a person must be to be allowed to see the
 *     movie
 */
function minimumAgeToView(movie) {
  if (isMovie(movie)) {
    return ratings[movie.rating];
  }
}

/**
 * @param {object} movie the movie to add
 */
function addMovie(movie) {
  if (isMovie(movie) && movies.filter(function(o) {
    return equalsMovie(o, movie);
  }).length === 0) {
    movies.push(movie);
    return true;
  }
  return false;
}

function movieToArticle(movie) {
  var $article = $('<article></article>');
  var $header = $('<header></header>');
  $header.text(movie.title + ' (' + movie.year + ')');
  var $ul = $('<ul></ul>');
  $ul.append($('<li></li>').text('Director:  ' + movie.director));
  $ul.append($('<li></li>').text('Stars:  ' + movie.stars));
  $ul.append($('<li></li>').text('Genres:  ' + movie.genres));
  $ul.append($('<li></li>').text('Rating:  ' + movie.rating));
  $article.append($header).append($ul);
  return $article;
}

function displayMovies(movieArr) {
  movieArr.sort(compareMoviesByTitle);
  for (var i = 0; i < movieArr.length; i++) {
    var $li = $('<li></li>');
    var $a = $('<a href></a>');
    $a.text(movieArr[i].title);
    $li.append($a).append(' (' + movieArr[i].year + ')');
    $('ul').append($li);
  }
}

function fillGenres() {
  var $filterGenres = $('select[name="filterGenres"]');
  var $addGenres = $('select[name="addGenres"]');
  genres.forEach(function(key) {
    $filterGenres.append($('<option></option>').text(key));
    $addGenres.append($('<option></option>').text(key));
  })
}

function fillRatings() {
  var $filterRatings = $('select[name="filterRatings"]');
  var $addRating = $('select[name="addRating"]');
  Object.keys(ratings).forEach(function(key) {
    $filterRatings.append($('<option></option>').text(key));
    $addRating.append($('<option></option>').text(key));
  });
}

$(document).ready(function() {
  fillGenres();
  fillRatings();
  displayMovies(movies);

  $('button[name="filter"]').on('click', function(event) {
    var $title = $('input[name="filterTitle"]').val();
    var $minYear = $('input[name="filterMinYear"]').val();
    var $maxYear = $('input[name="filterMaxYear"]').val();
    var $director = $('input[name="filterDirector"]').val();
    var $actor = $('input[name="filterActor"]').val();
    var $genres = $('select[name=filterGenres]').val();
    var $ratings = $('select[name=filterRatings]').val();

    var filtered = searchMoviesByTitle($title);
    if ($minYear.length > 0 || $maxYear.length > 0) {
      if ($minYear.length === 0) {
        $minYear = $maxYear;
      }
      if ($maxYear.length === 0) {
        $maxYear = $minYear;
      }
      filtered = allMoviesMadeInYearRange(filtered, $minYear, $maxYear);
    }
    if ($director.length > 0) {
      filtered = allMoviesByDirector(filtered, $director);
    }
    if ($actor.length > 0) {
      filtered = allMoviesWithActor(filtered, $actor);
    }
    if ($genres !== null && $genres.length > 0) {
      filtered = filtered.filter(function(movie) {
        return movieIsGenre(movie, $genres);
      });
    }
    if ($ratings !== null && $ratings.length > 0) {
      filtered = filtered.filter(function(movie) {
        return $ratings.indexOf(movie.rating) > -1;
      });
    }
    $('ul').empty();
    displayMovies(filtered);
  });

  $('button[name="add"]').on('click', function(event) {
    var $title = $('input[name="addTitle"]').val();
    var $year = $('input[name="addYear"]').val();
    var $director = $('input[name="addDirector"]').val();
    var $actor = $('input[name="addActors"]').val();
    var $genres = $('select[name=addGenres]').val();
    var $rating = $('select[name=addRating]').val();

    var movie = {
      title: $title,
      year: Number($year),
      genres: $genres,
      rating: $rating,
      director: $director,
      stars: $actor.split(/,\s*/)
    };
    if (isMovie(movie) && !isInMovieDatabase(movie)) {
      movies.push(movie);
    }
    $('ul').empty();
    displayMovies(movies);
  });

  $('a').on('click', function(event) {
    event.preventDefault();
    alert(JSON.stringify($(this)));
    alert($(event.currentTarget).val());
  });
});
