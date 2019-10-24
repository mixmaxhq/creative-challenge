const got = require("got");
const express = require("express");
const app = express();

/**
 * CORS headers to allow XHR requests from Mixmax.
 */
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "https://compose.mixmax.com");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Credentials", "true");
  next();
});

/**
 * This middleware prevents anyone except specific users from accessing this API.
 *
 * USERS is defined in .env and is a comma-separated list of email addresses, e.g.
 * alice@example.com,bob@example.com,carol@example.com
 *
 * @param {Object} request The express request object.
 *   @property {Object} query The request's query parameters.
 *   @property {string} user The email of the user's Mixmax account.
 */
const userValidator = (request, response, next) => {
  if (!process.env.USERS.split(',').includes(request.query.user)) {
    response.status(403).send('403 Forbidden');
    return;
  }
  next();
}

/**
 * Base URL has no functionality.
 */
app.get("/", (request, response) => {
  response.send('This is the API for a Mixmax slash command to insert cat facts in any email. <a href="https://glitch.com/edit/#!/remix/mixmax-cat-facts">Make your own!</a>');
});

/**
 * Command suggestions API. When the slash command is typed into a Mixmax email,
 * this API will provide a list of possible completions for the user's current
 * input.
 *
 * @param {Object} request The express request object.
 *   @property {Object} query The request's query parameters.
 *   @property {string} text The current text that the user has typed after the slash command.
 */
app.get("/suggest", userValidator, (request, response) => {
  const image = parseText(request.query.text);
  if (image) {
    response.json([getSuggestedCat(image)]);
  } else {
    const images = new Array(17);
    response.json(Array.from(images.keys()).map((imageKey) => {
      if (imageKey === 0) {
        return {
          title: "Random 🐱 cat",
          text: 0,
        };
      } else {
        return getSuggestedCat(imageKey);
      }
    }));
  }
});

/**
 * Command resolver API. When the user hits enter after typing the slash command
 * and some text, or selects a suggestion from the pop-up list, this API will be
 * called to provide the response that will appear in the email.
 *
 * @param {Object} request The express request object.
 *   @property {Object} query The request's query parameters.
 *   @property {string} text The current text that the user has typed after the slash command.
 */
app.get("/resolve", userValidator, async (request, response) => {
  const image = parseText(request.query.text);
  response.json(
    {
      subject: getRandomSubject(),
      body: await getBody(image),
    }
  );
});

// Listen for web requests
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

/**
 * Helper function to make sure the text we're receiving is a valid number.
 *
 * @param {string} text The number received by either API.
 *
 * @returns {int?} A valid number in the range 1 - 16, or null.
 */
function parseText(text) {
  let image = parseInt(text, 10);
  if (isNaN(image) || image > 16 || image < 1) image = null;
  return image;
}

/**
 * Helper function to return the variables to fill out the suggestions.
 *
 * @param {string} image The image number.
 *
 * @returns {Object}
 *   @property {string} title An image tag containing the desired cat image HTML.
 *   @property {string} text The image number.
 */
function getSuggestedCat(image) {
  return {
    title: getPlaceKitten(image, 150, 150, 50, 50),
    text: image
  };
}

/**
 * Helper function to provide a random cat-related subject line.
 *
 * @returns {string} A random subject line for the email.
 */
function getRandomSubject() {
  return [
    'Here kitty kitty kitty!',
    'I ♥ cats',
    'Meow!',
    'Purrrrr...',
    '🐈',
    '🐱',
    '😸',
    '😹',
    '😺',
    '😻',
    '😽'
  ][Math.round(Math.random() * 10)];
}

/**
 * Helper function to fetch a random cat fact.
 *
 * @returns {string} A random cat fact.
 */
async function getCatFact() {
  const response = await got.get("https://cat-fact.herokuapp.com/facts/random", {
    headers: {
      "Accept": "application/json"
    }
  });
  if (response.statusCode === 200) {
    const body = JSON.parse(response.body);
    return body.text;
  }
}

/**
 * Helper function to provide formatted HTML for insertion into the email.
 *
 * @param {string} image The image number selected.
 *
 * @returns {string} The resulting HTML with the given image and a random cat fact.
 */
async function getBody(image) {
  return `<table border="0" style="border: 1px black solid"><tr><td width="150">${getPlaceKitten(image)}</td><td><p style="font-size: 20pt; padding-left: 5px;">${await getCatFact()}</p></td></tr></table>`;
}

/**
 * Helper function to get a random or selected cat image.
 *
 * @param {string?} image The selected image, or null for a random image.
 * @param {int?} width The width of the image to request.
 * @param {int?} height The height of the image to request.
 * @param {int?} scaleWidth The width to output in the HTML.
 * @param {int?} scaleHeight The height to output in the HTML.
 *
 * @returns {string} The HTML for the given image at the desired dimensions.
 */
function getPlaceKitten(image, width = 150, height = 150, scaleWidth = 150, scaleHeight = 150) {
  if (!image) image = Math.round(Math.random() * 15) + 1;
  return `<img src="http://placekitten.com/${width}/${height}?image=${image}" width="${scaleWidth}" height="${scaleHeight}" alt="Meow">`;
}
