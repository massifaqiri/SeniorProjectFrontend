import React from 'react';
import { Button } from 'react-bootstrap';

// Custom Imports
import "./styles/Home.css";
import ControlledCarousel from "./Slideshow";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exampleAPICallData: [],
        }
    }

    componentDidMount() {
        let url = 'https://h1xqnteg60.execute-api.us-east-2.amazonaws.com/SelectProd?table=Textbooks&field=book_author';
        fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': 'dKEhYInqF09xERGUZcQQ3aCKELroAbsk1vVZLhb3',
            }
        })
        .then(res => res.json())
        .then(json => {
            this.setState({
                exampleAPICallData: json,
            })
        });
    }

    render() {
        return (
            <div className="Home">
                <ControlledCarousel id="slideshow"/>
                <div className="text-center">
                    <a href="/signin"><Button variant="success">Sign In</Button></a>
                    <a href="/createaccount"><Button variant="secondary">Create Account</Button></a>
                </div>
                <div className="text-center">
                    <a href="/categories">Continue as guest</a>
                </div>
            </div>
        );
    }
}

export default Home;