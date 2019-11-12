import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from '../presentational/Header';
import RandomLink from '../presentational/RandomLink';
import Input from '../presentational/Input.jsx';
import '../../styles/styles.scss';

class FormContainer extends Component {
    constructor() {
        super()
        this.state = {
            title: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
     fetchResults(searchQuery) {
        const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    
         fetch(endpoint)
             .then(response => response.json())
             .then(data => {
                 const results = data.query.search;
                 
                 results.forEach(result => {
                     
                    const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
                    // Double check what is being outputted. Consult movie_list for inspo
                    this.setState({result: result.title});
                 });
                })
             .catch(() => console.log('Error! Unable to show results'));
}
    handleChange(event) {
        event.preventDefault();
        this.setState({ [event.target.id]: event.target.value})
    }

    handleSubmit() {
        event.preventDefault();

        const { searchQuery } = this.state.title;
        this.fetchResults(searchQuery);
        
    }
    render() {
        const { title } = this.state;

        return (
            <div>
                <form id="article-form" onSubmit={this.handleSubmit}>
                    <Input
                        text="Search"
                        type="text"
                        id="title"
                        // maybe set value attr to title
                        value={this.state.title}
                        handleChange={this.handleChange}
                    />
                </form>
                <RandomLink />
        <section>{this.state.result}</section>
            </div>  
        )
    }
}
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;

//Export the form container to be used in index.js
export default FormContainer;