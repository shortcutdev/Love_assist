import {React, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import optionsjson from '../data/options.json'
import AddPartnerThree from './AddPartnerThree';
function AddPartnerTwo({ show, onHide, gender, name, age, nation, senddata,id }) {
  const [openthree, setopenthree] = useState(false);
    const [mindset, setmindset] = useState("Select");
    const [selectedOptions, setSelectedOptions] = useState({});
    const handleCloseModal = () => {
      setopenthree(false);
    };
    const handleOptionChange = (groupName, optionKey) => {
      setSelectedOptions(prevOptions => ({
        ...prevOptions,
        [groupName]: optionKey
      }));
    }


    const questions = [
      {
        groupName: 'Listening actively:',
        question: 'How does the person usually talk about their goals or ambitions?',
        options: [
          { key: 'A', label: 'They focus on individual achievements and personal success.' },
          { key: 'B', label: 'They emphasize collaboration and teamwork.' },
          { key: 'C', label: 'They prioritize making a positive impact on others or the community.' }
        ]
      },
      {
        groupName: 'Observing body language:',
        question: 'How does the person typically react in stressful situations?',
        options: [
          { key: 'A', label: 'They become tense and may display signs of frustration or aggression.' },
          { key: 'B', label: 'They remain calm and composed, seeking solutions collaboratively.' },
          { key: 'C', label: 'They express concern for others\' well-being and offer support.' }
        ]
      },
      {
        groupName: 'Asking open-ended questions:',
        question: 'What does the person consider most important in life?',
        options: [
          { key: 'A', label: 'Material wealth and status.' },
          { key: 'B', label: 'Meaningful relationships and connections.' },
          { key: 'C', label: 'Personal growth and self-improvement.' }
        ]
      },
      {
        groupName: 'Empathizing:',
        question: 'How does the person respond to others\' struggles or challenges?',
        options: [
          { key: 'A', label: 'They may offer advice or solutions without fully understanding the other person\'s perspective.' },
          { key: 'B', label: 'They actively listen and provide emotional support, seeking to understand before offering help.' },
          { key: 'C', label: 'They engage in collaborative problem-solving, considering multiple perspectives.' }
        ]
      },
      {
        groupName: 'Paying attention to patterns:',
        question: 'What recurring themes emerge in the person\'s conversations or actions?',
        options: [
          { key: 'A', label: 'Independence and self-reliance.' },
          { key: 'B', label: 'Interdependence and cooperation.' },
          { key: 'C', label: 'Compassion and empathy towards others.' }
        ]
      },
      {
        groupName: 'Seeking context:',
        question: 'How does the person\'s cultural background influence their beliefs and behaviors?',
        options: [
          { key: 'A', label: 'Individual achievement is highly valued, with an emphasis on personal success.' },
          { key: 'B', label: 'Collective well-being is prioritized, with an emphasis on community support and cooperation.' },
          { key: 'C', label: 'Both individual and collective goals are important, with a focus on balance and harmony.' }
        ]
      },
      {
        groupName: 'Being patient and open-minded:',
        question: 'How does the person respond to new ideas or perspectives?',
        options: [
          { key: 'A', label: 'They may be resistant to change and prefer to stick to familiar beliefs.' },
          { key: 'B', label: 'They are open to new experiences and willing to consider different viewpoints.' },
          { key: 'C', label: 'They actively seek out diverse perspectives and enjoy engaging in intellectual discussions.' }
        ]
      },
      {
        groupName: 'Engaging in deep conversations:',
        question: 'What topics or issues ignite the person\'s passion or interest?',
        options: [
          { key: 'A', label: 'Achieving personal success and overcoming challenges.' },
          { key: 'B', label: 'Building strong relationships and fostering community connections.' },
          { key: 'C', label: 'Making a positive impact on society and addressing social injustices.' }
        ]
      },
      {
        groupName: 'Considering external influences:',
        question: 'How does the person respond to societal norms or expectations?',
        options: [
          { key: 'A', label: 'They may conform to societal expectations and prioritize fitting in.' },
          { key: 'B', label: 'They question societal norms and seek to challenge or change them.' },
          { key: 'C', label: 'They navigate societal expectations while staying true to their personal values and beliefs.' }
        ]
      },
      {
        groupName: 'Reflecting on your own biases:',
        question: 'How might your own background or experiences influence your perception of the person\'s mindset?',
        options: [
          { key: 'A', label: 'I may tend to view independence and self-reliance as admirable qualities.' },
          { key: 'B', label: 'I may value empathy and cooperation in interpersonal relationships.' },
          { key: 'C', label: 'I may prioritize social justice and community involvement in my interactions.' }
        ]
      }
    ];

      const options = [
        selectedOptions['Listening actively:'],
        selectedOptions['Observing body language:'],
        selectedOptions['Asking open-ended questions:'],
        selectedOptions['Empathizing:'],
        selectedOptions['Paying attention to patterns:'],
        selectedOptions['Seeking context:'],
        selectedOptions['Being patient and open-minded:'],
        selectedOptions['Engaging in deep conversations:'],
        selectedOptions['Considering external influences:'],
        selectedOptions['Reflecting on your own biases:'],
      
    ]
    const filteredArray = options.filter(element => element !== undefined);

    const check = (userOptions) => {
      
      //console.log(array);
      const string = '[' + userOptions.join(', ') + ']';
      setmindset(optionsjson[string] || "Mindset not found")
      setopenthree(true)
    }

  return (
    <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        
    >
        <Modal.Header closeButton>
            <Modal.Title>Add Friends</Modal.Title>
        </Modal.Header>
        <Modal.Body className='min-h-[300px] max-h-[600px]'>
  
            <div className='flex'>
                <h4 className='mt-1'>{gender === '👨Man'? 'He have a ': 'she have a '}</h4>
                <DropdownButton
                className='mx-2'
                variant="outline-secondary"
                title={mindset}
                id="input-group-dropdown-2"
                align="end"
                >
                <Dropdown.Item onClick={()=>{setmindset("Select")}}>Select</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setmindset("Independent mindset")}}>Independent mindset</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setmindset("Cooperative mindset")}}>Cooperative mindset</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setmindset("Compassionate mindset")}}>Compassionate mindset</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setmindset("Balanced mindset")}}>Balanced mindset</Dropdown.Item>
                </DropdownButton>
            
            </div>
          
            {mindset === 'Select' ?
            <div>
                              <h4 className="text-center my-4">
       <Badge bg="secondary">OR</Badge>
      </h4>
                <h3 className="text-center my-2">Find {gender === '👨Man'? ' his ': 'her '}mindset </h3>
              <div class="overflow-y-auto max-h-[400px]" >
              
              {questions.map(({groupName,question,options})=>(
                <div>
                  <Card>
                    <Card.Body>
                  <h5>{groupName}</h5>
                <p>{question}</p>
                
                    <Form>
                    {options.map(({ key, label }) => (
                      <Form.Check
                        key={key}
                        name={groupName}
                        type="radio"
                        label={label}
                        value={key}
                        checked={selectedOptions[groupName] === key}
                        onChange={() => handleOptionChange(groupName, key)}
                      />
                    ))}
                  </Form>
                </Card.Body>
                </Card>
              
                </div>
                
))}
              
              
              <div className='mt-7 mx-20 flex justify-between'>
                <Button variant="secondary" onClick={onHide}>
                Reset
            </Button>
            <Button onClick={() =>{(check(filteredArray))}}  variant="primary">Find mindset</Button>
              </div>
              
                
            </div>
            </div>
            
            :
            <div>
             
            </div>
            
}

           
        </Modal.Body>
          {
            mindset === 'Select' && 
            <Modal.Body>
              {mindset !== 'Select' &&
               <h4 className="text-center">{gender === '👨Man'? ' he ': 'she '} has a {mindset} mindset</h4>
              }
       
        </Modal.Body>
          }
        
          {mindset !=='Select' && <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Back
            </Button>
            <Button onClick={()=>{setopenthree(true)}}  variant="primary">Next</Button>
        </Modal.Footer>}
        
        <AddPartnerThree
        
            senddata = {senddata}
            name = {name}
            age = {age}
            nation = {nation}
            gender = {gender}
            mindset = {mindset}
            show =  {openthree}
            onHide ={handleCloseModal}
            id = {id}>
        </AddPartnerThree>
    </Modal>
    
);
}

export default AddPartnerTwo