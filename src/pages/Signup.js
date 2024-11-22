import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from '../firebase';

function Signup() {
    const [isLoading, setLoading] = useState(false);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");

    const auth = getAuth(app);
    const navigate = useNavigate();

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

      
    
      const createaccount = (email,pass,username) =>{
        if (pass === confirmpassword) {
          setLoading(true);
          createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
              const user = userCredential.user;
              // Update the user's display name
              updateProfile(user, {
                displayName: username
              })
              .then(() => {
                //console.log('Profile updated successfully', user.displayName);
                setLoading(false);
                // Navigate to home or another page if needed
                navigate('/');
              })
              .catch((error) => {
                console.error('Error updating profile:', error);
                setLoading(false);
              });
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error('Error in creating account:', errorCode, errorMessage);
              setLoading(false);
              //alert('Error: ' + errorMessage);
            });
        } else {
          //alert('Passwords do not match');
        }
          
        
      }
  return (
    <>
    
        <Navbar></Navbar>
        <div className='flex justify-center items-center mt-[50px]'>
        <Card >
      <Card.Body>
            <h1>
                 <Badge bg="success">Signup</Badge>
            </h1>
               <h6 className='my-3'>
                Create a new account
               </h6>

               
                <div className='my-3'>
                    <InputGroup className="mb-3">
                   <InputGroup.Text style={{ backgroundColor: '#0D6EFD' }} id="basic-addon1"><Badge bg="primary">Your username</Badge></InputGroup.Text>
                    <Form.Control
                    placeholder=""
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) =>{setname(e.target.value)}}
                 />
                  </InputGroup> 
                </div>
                <div className='my-3'>
                    <InputGroup className="mb-3">
                   <InputGroup.Text style={{ backgroundColor: '#0D6EFD' }} id="basic-addon1"><Badge bg="primary">Your valid email for verification</Badge></InputGroup.Text>
                    <Form.Control
                    placeholder=""
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) =>{setemail(e.target.value)}}
                 />
                  </InputGroup> 
                </div>
                <div className='my-3'>
                    <InputGroup className="mb-3">
                    <InputGroup.Text style={{ backgroundColor: '#0D6EFD' }} id="basic-addon1"><Badge bg="primary">Your Strong password</Badge></InputGroup.Text>
                    <Form.Control
                    placeholder=""
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    onChange={(e) =>{setpassword(e.target.value)}}
                 />

                  </InputGroup>
                </div>
                <div className='my-3'>
                   <InputGroup className="mb-3">
                    <InputGroup.Text style={{ backgroundColor: '#0D6EFD' }} id="basic-addon1"><Badge bg="primary">Confirm your password</Badge></InputGroup.Text>
                    <Form.Control
                    placeholder=""
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    onChange={(e) =>{ setconfirmpassword(e.target.value) }}
                 /> 
                 
                 </InputGroup>
                </div>
                  
                  <div className='my-5 flex justify-between'>
                    <Button onClick={() =>{navigate('/login')}} variant="success">Login</Button>{' '}
                  <Button onClick={() =>{createaccount(email,confirmpassword,name)}}  variant="success">{isLoading ? 'Loading…' : 'Create a new account'}</Button>{' '}
                  </div>
                  
                  
      </Card.Body>

    </Card>
        </div>

    </>
  )
}

export default Signup