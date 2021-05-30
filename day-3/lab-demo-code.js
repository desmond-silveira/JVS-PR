var isStringArray = function(object) {
  if (!(object instanceof Array)) {
    return false;
  }

  for (var i = 0; i < object.length; i++) {
    if (typeof object[i] !== 'string') {
      return false;
    }
  }

  return true;
};

var ratingsToMinimumAgesMap = {
  'G': 0,
  'PG': 0,
  'PG-13': 13,
  'R': 18
};

var moviePropertiesMap = {
  'title': true,
  'year': true,
  'genres': true,
  'rating': true,
  'director': true,
  'stars': true
};

var isMovieProperty = function(property) {
  return moviePropertiesMap[property];
};

var hasOnlyMovieProperties = function(object) {
  var properties = Object.keys(object);

  for (var i = 0; i < properties.length; i++) {
    if (!isMovieProperty(properties[i])) {
      return false;
    }
  }

  return true;
};

var isMovie = function(object) {
  var hasTitle = typeof object.title === 'string';
  var hasYear = typeof object.year === 'number';
  var hasGenres = isStringArray(object.genres);
  var hasRating = ratingsToMinimumAgesMap.hasOwnProperty(object.rating);
  var hasDirector = typeof object.director === 'string';
  var hasStars = isStringArray(object.stars);
  var hasNothingElse = hasOnlyMovieProperties(object);

  console.log("title", hasTitle, "year", hasYear, "genres",
    hasGenres, "rating", hasRating, "director", hasDirector,
    "stars", hasStars, "nothing else", hasNothingElse);

  return hasTitle && hasYear && hasGenres && hasRating &&
    hasDirector && hasStars && hasNothingElse;
};

var areSameMovies = function(movie1, movie2) {
  return movie1.title === movie2.title &&
    movie1.director === movie2.director;
};

var isInMovieDatabase = function(movie) {
  var matchingMovies = movies.filter(function(otherMovie) {
    return areSameMovies(movie, otherMovie);
  });

  return matchingMovies.length > 0;
};

var addMovie = function(movie) {
  if (!isMovie(movie) || isInMovieDatabase(movie)) {
    return false;
  } else {
    movies.push(movie);
    return true;
  }
};
















// Truthy and falsey values
// Falsey values: false, null, undefined, 0, NaN, '', (others?)
// Truthy values: everything else

var a = '';

if (a) {
  console.log("Yes");
} else {
  console.log("No");
}

















var isSameMovieAs2 = function(movie, otherMovie) {
  return otherMovie.title === movie.title && otherMovie.director === movie.director;
};

// Curried version of isSameMovieAs2
var isSameMovieAs = function(movie) {
  return function(otherMovie) {
    return otherMovie.title === movie.title && otherMovie.director === movie.director;
  };
};

function addMovie(movie) {
  if (isMovie(movie) && movies.filter(isSameMovieAs(movie)).length === 0) {
    movies.push(movie);
    return true;
  }
  return false;
}



var allMoviesMadeInYear = function(year) {
  return movies.filter(function(movie) {
    return movie.year === year;
  });
};
