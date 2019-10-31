import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from '../presentational/Header';
import Input from '../presentational/Input.jsx';
import axios from 'axios';
import '../../styles/styles.scss';

class FormContainer extends Component {
    constructor() {
        super()
        this.state = {
            title: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const wikiURL = `http://example.org/w/api.php`;

        event.preventDefault();

        this.setState({ [event.target.id]: event.target.value})
    }
   
    render() {
        const { title } = this.state;

        return (
            <div>
                <form id="article-form">
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