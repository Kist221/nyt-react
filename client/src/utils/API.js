import axios from "axios";

const APIkey = "f944a4982edc4da3aa536bb309f9fcf4";
const filter = "&fl=headline,byline,web_url,pub_date";
const sort = "&sort=newest"
const url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + APIkey + filter + sort + "&q=";

export default {
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
  searchArticles: function(searchTerm) {
    return axios.get(url + searchTerm)
      .then( res => res.data.response.docs );
  }
};
