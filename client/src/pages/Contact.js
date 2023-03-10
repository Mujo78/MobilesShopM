import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ErrorFinder from '../components/ErrorFinder';
import Footer from "../components/Footer";


export default function Contact(){

    const [commentData, setCommentData] = useState({
        ime:"",
        email:"",
        comment:""
    })
    const [errorData, setErrors] = useState([]);

    function handleSubmit(event){
        event.preventDefault();
        axios.post("http://localhost:3001/post-comment", commentData)
        .then(() => {
            setCommentData({
                ime:"",
                email:"",
                comment:""
            })
            setErrors([]);

        }).catch(error => {
            setErrors(error.response.data.errors);
        })
    }

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setCommentData(n => {
            return{
                ...n,
                [name]: value
            }})
    }

    let num = errorData.length;

    return(
        <>
        <div className='d-flex flex-column justify-content-center align-items-center'>
        <h1>Contact</h1>
        <br/>
            <Form onSubmit={handleSubmit} className="w-50">
                <Form.Group className="mb-2">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control
                        type="text"
                        name='ime'
                        value={commentData.ime}
                        onChange={handleChange}
                        autoFocus />
                {num > 0 && <ErrorFinder errorsLogin={errorData} fieldName="ime" />}
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="name@example.com"
                        name='email'
                        value={commentData.email}
                        onChange={handleChange}
                        autoFocus />
                {num > 0 && <ErrorFinder errorsLogin={errorData} fieldName="email" />}
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows={4}
                        name="comment"
                        value={commentData.comment}
                        onChange={handleChange}
                        autoFocus />
                {num > 0 && <ErrorFinder errorsLogin={errorData} fieldName="comment" />}
                </Form.Group>
                <Form.Group>
                    <Button type="submit" style={{backgroundColor:"#219aeb"}}>
                        Submit
                    </Button>
                </Form.Group>
        </Form>
      </div>
      <br/><br/>
      <Footer />
      </>
    )
}