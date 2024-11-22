import {React, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Badge from 'react-bootstrap/Badge';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL  } from'firebase/storage';
import {getFirestore,  doc, updateDoc, collection, addDoc   } from "firebase/firestore"; 


function AddPartnerThree({ show, onHide, gender, name, age, nation,mindset,senddata, id, editable, partnerid, picurl }) {

    const [downloadurl, setdownloadurl] = useState('');
    const [nametype, setnametype] = useState(name);
    const [agetype, setagetype] = useState(age);
    const [gendertype, setgendertype] = useState(gender);
    const [mindsettype, setmindsettype] = useState(mindset);
    const [relationtype, setrelationtype] = useState(nation);
    const generateId = () => uuidv4();
    const newId = generateId();
    const db = getFirestore(app)

        useEffect(() => {
            setnametype(name)
            setagetype(age)
            setgendertype(gender)
            setmindsettype(mindset)
            setrelationtype(nation)
            setdownloadurl(picurl)
        }, []);

        const data = [name,age,gendertype,relationtype,mindsettype,downloadurl,id]
        const navigate = useNavigate();
        const onclose = () =>{
            setnametype(name)
            setagetype(age)
            setgendertype(gender)
            setmindsettype(mindset)
            setrelationtype(nation)
            setdownloadurl(picurl)
            onHide()
        }
        const send_the_data = async() =>{
            if(!editable){
                setPartnerdata(nametype,agetype,gendertype,relationtype,mindsettype,downloadurl,id)
            }
            else{
                edit(nametype,agetype,gendertype,relationtype,mindsettype,downloadurl,id)
            }
            
            
        }

        const uploadPic = async(event) => {
            const storage = getStorage()
            const file = event.target.files[0];
            const fileRef = ref(storage, `/Partner/${file.name}`);
            
            uploadBytes(fileRef, file).then((snapshot) => {
              getDownloadURL(fileRef).then(async(url) => {
                setdownloadurl(url)
                
               // setPartnerdata(name,age,gender,relation,mindset,url,id)
              });
              
            }).catch((error) => {
              console.error('Error uploading file:', error);
            });
          
          
          };
        
        const setPartnerdata = async(name,age,gender,relation,mindset,url,id) =>{
            console.log('in new data');
            const docRef = await addDoc(collection(db, `User_info/${id}/partner`), {
                Name: name,
                Age: age,
                Gender: gender,
                Relation: relation,
                Mindset: mindset,
                Picture: url,
              });            
              const data = new URLSearchParams({id:docRef.id,update:newId}).toString();
              //console.log('Document written with ID: ', docRef.id);
              //console.log(age);
              navigate(`/partner?${data}`);
              onHide()
        }

        const edit = async(name,age,gender,relation,mindset,url,id) =>{
            console.log('in edit');
            await updateDoc(doc(db, `User_info/${id}/partner`, partnerid), {
                Name: name,
                Age: age,
                Gender: gender,
                Relation: relation,
                Mindset: mindset,
                Picture: url,
              });
              const data = new URLSearchParams({id:partnerid, update:newId}).toString();
              navigate(`/partner?${data}`);
              onHide()
              
        }


  return (
    <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        
    >
        <Modal.Header closeButton>
            <Modal.Title>Confirm the Details</Modal.Title>
        </Modal.Header>
        
        <Modal.Body  className='min-h-[500px]'>


            {editable ? 
            <div>
                 <InputGroup className="mb-3" >
                    <InputGroup.Text style={{ backgroundColor: '#198754' }} id="basic-addon1"><Badge bg="success">Name</Badge></InputGroup.Text>
                    <Form.Control
                    placeholder={nametype}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) =>{setnametype(e.target.value)}} 
                    />
                </InputGroup>

                <InputGroup className="mb-3" >
                    <InputGroup.Text style={{ backgroundColor: '#198754' }} id="basic-addon1"><Badge bg="success">Age</Badge></InputGroup.Text>
                    <Form.Control
                    placeholder={agetype}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) =>{setagetype(e.target.value)}} 
                    />
                </InputGroup>

                 <InputGroup className="mb-3" >
                    <InputGroup.Text style={{ backgroundColor: '#198754' }} id="basic-addon1"><Badge bg="success">gender</Badge></InputGroup.Text>
                        <DropdownButton
                        variant="outline-secondary"
                        title={gendertype}
                        id="input-group-dropdown-1"
                        >
                        <Dropdown.Item onClick={()=>{setgendertype('👨Man')}}>👨Man</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={()=>{setgendertype('👩Women')}}>👩Women</Dropdown.Item>
                        
                        
                        </DropdownButton>
                 </InputGroup>
                    
               

                 <InputGroup className="mb-3" >
                    <InputGroup.Text style={{ backgroundColor: '#198754' }} id="basic-addon1"><Badge bg="success">Relation</Badge></InputGroup.Text>
                        <DropdownButton
                        variant="outline-secondary"
                        title={relationtype}
                        id="input-group-dropdown-1"
                        >
                        <Dropdown.Item onClick={()=>{setrelationtype(gendertype ==='👨Man' ? 'Dad':'Mom')}}>{gendertype ==='👨Man' ? 'Dad':'Mom'}</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={()=>{setrelationtype(gendertype ==='👨Man' ? 'brother':'sister')}}>{gendertype ==='👨Man' ? 'brother':'sister'}</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={()=>{setrelationtype(gendertype ==='👨Man' ? 'Boy-Friend':'Girl-Friend')}}>{gendertype ==='👨Man' ? 'Boy-Friend':'Girl-Friend'}</Dropdown.Item>
                        <Dropdown.Divider />
                        
                        
                        </DropdownButton>
                 </InputGroup>
                    
               

                        <InputGroup className="mb-3" >
                            <InputGroup.Text style={{ backgroundColor: '#198754' }} id="basic-addon1"><Badge bg="success">mindset</Badge></InputGroup.Text>
                    <DropdownButton
                        className='mx-2'
                        variant="outline-secondary"
                        title={mindsettype}
                        id="input-group-dropdown-2"
                        align="end"
                        >
                        <Dropdown.Item onClick={()=>{setmindsettype("Select")}}>Select</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setmindsettype("Independent mindset")}}>Independent mindset</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setmindsettype("Cooperative mindset")}}>Cooperative mindset</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setmindsettype("Compassionate mindset")}}>Compassionate mindset</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{setmindsettype("Balanced mindset")}}>Balanced mindset</Dropdown.Item>
                    </DropdownButton>
                        </InputGroup>
                    
                
            </div>
            
            
                :
                ['Name', 'Age', 'Gender', 'Relation', 'Mindset'].map((items,idx) =>(
                
                    <InputGroup className="mb-3" key={idx}>
                        <InputGroup.Text style={{ backgroundColor: '#198754' }} id="basic-addon1"><Badge bg="success">{items}</Badge></InputGroup.Text>
                        <Form.Control
                        placeholder={data[idx]}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        readOnly 
                        />
                    </InputGroup>
                ))
            }
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Choose your profile pic</Form.Label>
              <Form.Control type="file" onChange={uploadPic}/>
          
            </Form.Group>
        </Modal.Body>
        

        <Modal.Footer>
            <Button variant="secondary" onClick={onclose}>
                {editable ? 'Close': 'Edit'}
            </Button>
            <Button variant="primary" onClick={()=>{send_the_data()}}>Next</Button>
        </Modal.Footer>

    </Modal>
    
);
}

export default AddPartnerThree