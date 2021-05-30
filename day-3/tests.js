var testsPassed;
var testsFailed;
var numTests = 30;

var assert = function(expr) {
  try {
    var result = eval(expr);
  } catch (e) {
    console.log("Exception thrown during test: " + expr);
    throw e;
  }

  if (!result) {
    if (testsFailed < 3) {
      console.log("Test failed: " + expr);
    }
    testsFailed++;
  } else {
    testsPassed++;
  }
};

var tests = function() {
  assert("isMovie({ title: 'foo', year: 1234, genres: ['Action'], rating: 'PG', director: 'bar', stars: [] })");
  assert("!isMovie({ title: 'foo', year: '123', genres: ['Action'], rating: 'asdf', director: 'bar', stars: [] })");
  assert("!isMovie({ title: 'foo', year: 123, genres: ['Action'], rating: 'R', director: 'bar', stars: [null] })");
  assert("!isMovie({ title: 'foo', year: 123, genres: [0], rating: 'R', director: 'bar', stars: [] })");
  assert("!isMovie({ title: {}, year: 123, genres: ['Action'], rating: 'R', director: 'bar', stars: [] })");
  assert("!isMovie({ title: 'Serenity' })");
  assert("!isMovie({ garbage: false, title: 'foo', year: 1234, genres: ['Action'], rating: 'PG', director: 'bar', stars: [] })");

  assert("allMoviesMadeInYear(2005).length === 2");
  assert("allMoviesMadeInYear(1905).length === 0");
  assert("allMoviesMadeInYear(1972).length === 1");
  assert("isMovie(allMoviesMadeInYear(1972)[0])");

  assert("allMoviesMadeInYearRange(2006, 2012).length === 3");
  assert("allMoviesMadeInYearRange(2005, 2005).length === 2");
  assert("allMoviesMadeInYearRange(1801, 1805).length === 0");
  assert("isMovie(allMoviesMadeInYearRange(2005, 2005)[0])");

  assert("allMoviesByDirector('Joss Whedon').length === 2");
  assert("allMoviesByDirector('Christopher Nolan').length === 1");
  assert("allMoviesByDirector('Barack Obama').length === 0");

  assert("allMoviesWithActor('Samuel L. Jackson').length === 2");
  assert("allMoviesWithActor('Nathan Fillion').length === 1");
  assert("allMoviesWithActor('Britney Spears').length === 0");

  assert("searchMoviesByTitle('the').length === 4");
  assert("searchMoviesByTitle('snakes').length === 1");
  assert("searchMoviesByTitle('ajksldf').length === 0");

  assert("minimumAgeToView(movies[0]) === 18");
  assert("minimumAgeToView(movies[3]) === 0");
  assert("minimumAgeToView(movies[4]) === 13");

  addMovie({
    title: "Inside Out",
    year: 2015,
    genres: ["Animation", "Adventure", "Comedy", "Drama"],
    rating: "PG",
    director: "Pete Docter",
    stars: ["Amy Poehler", "Bill Hader", "Lewis Black", "Mindy Kaling"]
  });

  assert("searchMoviesByTitle('inside out').length === 1");

  assert("addMovie({ title: 'foo' }) === false");

  assert("searchMoviesByTitle('foo').length === 0");
}

var printTestResults = function() {
  console.log("Tests passed: " + testsPassed + " / " + numTests);
  console.log("Tests failed: " + testsFailed + " / " + numTests);
}

var runTests = function() {
  testsPassed = 0;
  testsFailed = 0;

  try {
    tests();
  } catch (e) {
    printTestResults();
    throw e;
  }

  printTestResults();
}
