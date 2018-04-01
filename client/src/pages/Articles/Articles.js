import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import SaveBtn from "../../components/SaveBtn";
import { Input, FormBtn } from "../../components/Form";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

class Articles extends Component {
  state = {
    search: ""
  };

  saveArticle = (url, headline, byline, pub_date) => {
    const articleData = {
      url: url,
      headline: headline,
      byline: byline,
      date: pub_date
    }
    API.saveArticle(articleData)
      .then(res => alert("Saved Article"))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.search) {
      API.searchArticles( this.state.search )
        .then(res => this.setState({articles: res}))
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="sm-12">
            <Jumbotron>
              <h1>NYT Articles</h1>
              <form>
                <Input 
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search" 
                placeholder="Search" 
                />
                <FormBtn
                disabled={!this.state.search}
                onClick={this.handleFormSubmit}
                >
                  Search
                </FormBtn>
              </form>
            </Jumbotron>
            {this.state.articles ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article.web_url}>
                    <a href={article.web_url} target="_blank" rel="noopener">
                      <strong>
                        {article.headline.main || "NA"} - {article.byline.original || "NA"}
                      </strong>
                      <br />
                      <sub>
                        {article.pub_date.slice(0, 10) || Date.now()}
                      </sub>
                    </a>
                    <SaveBtn onClick={() => this.saveArticle(article.web_url, article.headline.main, article.byline.original, article.pub_date.slice(0, 10))} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
