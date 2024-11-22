import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase';

function Login() {
    const [isLoading, setLoading] = useState(false);
    const [user, setuser] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();
    const auth = getAuth(app);
    useEffect(() => {
        function simulateNetworkRequest() {
          return new Promise((resolve) => setTimeout(resolve, 2000));
        }
    
        if (isLoading) {
          simulateNetworkRequest().then(() => {
            setLoading(false);
          });
        }
      }, [isLoading]);

      

      const signin = (email,pass) =>{
        setLoading(true)
        signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate('/')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error",errorMessage);
      });
      }
    
  return (
    <>
    
        <Navbar></Navbar>
        <div className='flex justify-center items-center mt-[50px]'>
        <Card >
      <Card.Body>
            <h1>
                 <Badge bg="success">Login</Badge>
            </h1>
               <h6 className='my-3'>
                Login into your account
               </h6>

               
                <div className='my-3'>
                    <InputGroup className="mb-3">
                   <InputGroup.Text style={{ backgroundColor: '#0D6EFD' }} id="basic-addon1"><Badge bg="primary">Your username</Badge></InputGroup.Text>
                    <Form.Control
                    placeholder=""
                    aria-label="Username"
                    aria-describedby="basic-addon1"

                    onChange={(e) =>{setuser(e.target.value)}}
                 />
                  </InputGroup> 
                </div>
                <div className='my-3'>
                    <InputGroup className="mb-3">
                    <InputGroup.Text style={{ backgroundColor: '#0D6EFD' }} id="basic-addon1"><Badge bg="primary">Your Strong password</Badge></InputGroup.Text>
                    <Form.Control
                    placeholder=""
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) =>{setpassword(e.target.value)}}
                 />

                  </InputGroup>
                </div>
                  
                  <div className='my-5 flex justify-between'>
                    <Button onClick={() =>{navigate('/signup')}} variant="success">Signup</Button>{' '}
                  <Button onClick={() =>{signin(user,password)}}  variant="success">{isLoading ? 'Loading…' : 'Login'}</Button>{' '}
                  </div>
                  
                  
      </Card.Body>

    </Card>
        </div>

    </>
  )
}

export default Login