import {React, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AddPartnerTwo from './AddPartnerTwo';
function AddPartnerOne({ show, onHide, senddata, id }) {
    const [gender, setgender] = useState('Gender');
    const [openTwo, setopenTwo] = useState(false);
    const [name, setname] = useState('');
    const [age, setage] = useState('');
    const [relation, setrelation] = useState('Relation');
    const [close, setclose] = useState(true);

    const closeall = (data) =>{
        setclose(data)
        console.log("data",data);
    }
    const handleCloseModal = () => {
        setopenTwo(false);
      };

  return (
    <Modal
        show={show}
        onHide={onHide || close}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header closeButton>
            <Modal.Title>Add Friend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup className="mb-3">

                <div className='flex flex-col'>
                    <div className='flex flex-row'>
        
                
                <Form.Control
                placeholder="Name"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) =>{setname(e.target.value)}}
                />
                    </div>

                    <div className='flex flex-row my-2'>
                                    <DropdownButton
                        variant="outline-secondary"
                        title={gender}
                        id="input-group-dropdown-1"
                        >
                        <Dropdown.Item onClick={()=>{setgender('👨Man')}}>👨Man</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={()=>{setgender('👩Women')}}>👩Women</Dropdown.Item>
                        
                        
                        </DropdownButton>
                                    <Form.Control
                                    placeholder="Age"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) =>{setage(e.target.value)}}
                                    />

                    </div>
                    <div className='flex flex-row'>
                        <InputGroup.Text id="basic-addon1">🌎</InputGroup.Text>
                        <DropdownButton
                        variant="outline-secondary"
                        title={relation}
                        id="input-group-dropdown-1"
                        disabled={gender === 'Gender'}
                        >
                        <Dropdown.Item onClick={()=>{setrelation(gender ==='👨Man' ? 'Dad':'Mom')}}>{gender ==='👨Man' ? 'Dad':'Mom'}</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={()=>{setrelation(gender ==='👨Man' ? 'brother':'sister')}}>{gender ==='👨Man' ? 'brother':'sister'}</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={()=>{setrelation(gender ==='👨Man' ? 'Boy-Friend':'Girl-Friend')}}>{gender ==='👨Man' ? 'Boy-Friend':'Girl-Friend'}</Dropdown.Item>
                        <Dropdown.Divider />
                        
                        </DropdownButton>
                    </div>
                </div>
               
                
                
        </InputGroup>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button onClick={()=>{setopenTwo(true); console.log(name,age,relation);}} variant="primary">Next</Button>
        </Modal.Footer>
        <AddPartnerTwo
            closeall = {closeall}
            senddata = {senddata}
            name = {name}
            age = {age}
            nation = {relation}
            gender = {gender}
            show ={openTwo}
            onHide ={handleCloseModal}
            id = {id}
        ></AddPartnerTwo>
    </Modal>

);
}

export default AddPartnerOne