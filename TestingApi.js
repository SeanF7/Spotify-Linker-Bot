import axios from 'axios';

await axios
.get("https://api.spotify.com/v1/search?q=Emo&type=artist", {
  params: { limit: 1, offset: 0 },
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + "BQCYIYDeyC546UZuCVVIXemI-hzL9vGuY4QV2yMcsdcHyB03s4cmAwuutvtVhzjHsUCCSliiOWDjC7c5n5ASxcmQCy89aUTRgsf6vBj1diBlzoX7IjRO0nMizT925Roxf4s7E8TPvZnMBhNdNf4EDvn9A7F50bBsEAI",
    "Content-Type": "application/json",
  },
})
.then((resp) => console.log(resp.data.artists.items[0].external_urls.spotify));