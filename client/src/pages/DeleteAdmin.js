import axios from "axios"
import { useEffect, useState } from "react"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";


export default function DeleteAdmin(){
    const [adminData, setAdminsData] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(()=> {
        getAdmins();
    }, [])

    const getAdmins = () => {
        axios.get("http://localhost:3001/all-admins", {
            headers:{
                'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(response=>{
            setAdminsData(response.data);
        }).catch(error => {
            setErrors(error.response.data);
        })
    }
    let num = errors.length;

    const deleteAdmin = (id, username) => {
        let answer = window.confirm(`Da li ste sigurni da želite obrisati korisnika: ${username}?`);
 

        if(answer){

            axios.delete(`http://localhost:3001/delete/${id}`,{
                headers:{
                    'accessToken' : `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            .then(setAdminsData(adminData.filter(m => m.id !== id )))
            .catch(error=>{
                setErrors(error);
            })
        }
    }

    return(
        <>
        <h1>Delete Admin</h1>
        <div className="d-flex flex-wrap mt-4">
               {num <= 0 ?
                    adminData.map(n => ( <Card key={n.id} className="me-2">
                    <Card.Body className="d-flex align-items-center flex-wrap">
                        <Card.Title className="me-2">{n.ime} {n.prezime}</Card.Title>
                        <Button onClick={() => deleteAdmin(n.id, n.username)}>Delete</Button>
                    </Card.Body>
                </Card>)) : <Alert variant="danger">{errors}</Alert>
                }
            
        </div>
        </>

    )
}