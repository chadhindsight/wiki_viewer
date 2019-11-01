import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from '../presentational/Header';
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
                 console.log(data);
             })
             .catch(() => console.log('An error occurred'));
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
                <a href="https://en.wikipedia.org/wiki/Special:Random" target="_blank" rel="noopener">
                    <img src="https://image.ibb.co/fR5OX5/random.png" alt="Shuffle Icon" /></a> 
            </div>  
        )
    }
}
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;

//Export Form container to be used in index.js
export default FormContainer;