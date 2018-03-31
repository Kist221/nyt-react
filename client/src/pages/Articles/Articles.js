import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import { Input, FormBtn } from "../../components/Form";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

class Articles extends Component {
  state = {
    articles: [],
    search: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res => this.setState({ articles: res.data }))
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
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
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <a href={"/articles/" + article._id}>
                      <strong>
                        {article.title} by {article.author}
                      </strong>
                    </a>
                    <DeleteBtn />
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
