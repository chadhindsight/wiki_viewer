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
        
         const searchResults = document.querySelector('#d');
         // Remove all child elements
         searchResults.innerHTML = '';

         fetch(endpoint)
             .then(response => response.json())
             .then(data => {
                 const results = data.query.search;
                 console.log(results)
                 results.forEach(result => {
                    //  const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
                    // //  Maybe put results in by using insertAdjacentHTML? Cant seem to do it without it
                    //  searchResults.insertAdjacentHTML('beforeend',
                    //      `<div class="resultItem">
                    //         <h3 class="resultItem-title">
                    //         <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
                    //         </h3>
                    //      <span class="resultItem-snippet">${result.snippet}</span><br>
                    //         <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
                    //     </div>`
                    //  );
                 });
                })
             .catch(() => console.log('Error! Unable to show results'));
}

    handleChange(event) {
        event.preventDefault();
        this.setState({ [event.target.id]: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ [event.target.id]: event.target.value })
        
        const searchQuery  = this.state.title;
        this.fetchResults(searchQuery);    
    }
       

    
    render() {

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
                <section id="d">{this.state.results}</section>
            </div>  
        )
    }
}
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;

//Export the form container to be used in index.js
export default FormContainer;