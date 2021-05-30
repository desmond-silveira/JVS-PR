var ratings = {"G": 0, "PG": 0, "PG-13": 13, "R": 18};

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
function allMoviesMadeInYearRange(startYear, endYear) {
  return movies.filter(function(o) {
    return o.year >= startYear && o.year <= endYear;
  }).sort(compareMoviesByYear);
}

/**
 * @param {string} name
 * @return {object} array of movies made by a given director
 */
function allMoviesByDirector(name) {
  return movies.filter(function(o) {
    return o.director === name;
  }).sort(compareMoviesByYear);
}

/**
 * @param {string} name
 * @return {object} array of movies made by a given actor
 */
function allMoviesWithActor(name) {
  return movies.filter(function(o) {
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

function equalsMovie(a, b) {
  return a.title === b.title && a.director === b.director;
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
