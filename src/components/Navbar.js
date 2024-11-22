import {React,useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {Nav} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import { app } from '../firebase';

function Navbar(reload) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [newuser, setnewuser] = useState(false);
  const [username, setusername] = useState('');
  const [profile_pic, setprofile_pic] = useState('');
  const auth = getAuth(app);

  useEffect(() => {
    
    const get_login_user = async() =>{
      onAuthStateChanged(auth, (user) => {
        
        
      if (user) {
        
       //console.log('userdata',user);
        setusername(user.displayName)
        setprofile_pic(user.photoURL)
        //console.log('nv img',user.photoURL);
      } else {
       // //alert('new user')
        setnewuser(true)
      }
    
  });
  
    }

    get_login_user()

  }, [reload]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signout = () =>{
    signOut(auth).then(() => {
    navigate('/login')
  }).catch((error) => {
   console.log('signout error',error);
  });
  }


  return (
    <>  
    <Nav className='flex justify-between pt-4'
          variant="tabs" defaultActiveKey="/home">
            <div className='mx-6 flex'>
                    <Nav.Item>
                          <Nav.Link eventKey="link">Logo</Nav.Link>
                      </Nav.Item>
                    <Nav.Item>
                      
                          <Nav.Link onClick={handleShow}>
                            <img className='w-6 h-6' src={'https://www.svgrepo.com/show/80173/menu-symbol-of-three-parallel-lines.svg'} alt="" />
                          </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>      
                          <Nav.Link onClick={() => { navigate('/'); }}>Home</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                          <Nav.Link onClick={() => { navigate('/savedLetters'); }} eventKey="link-2">Saved Letters</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                          <Nav.Link onClick={() => { navigate('/savedPoem'); }} eventKey="link-3">Saved Poems</Nav.Link>
                      </Nav.Item>   
            </div>      
                  
                <div className='mx-4'>
                  {newuser ? 
                  
                  <Dropdown >
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='h-11 flex flex-row'>
                      <div className='flex'>
                        <img className='w-8 h-8 mx-2' src={'https://www.svgrepo.com/show/507597/circle.svg'} alt="" />
                      <p className='mx-2'>Join</p>
                      </div>
                    
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() =>{navigate('/login')}}>Login</Dropdown.Item>
                      <Dropdown.Item onClick={() =>{navigate('/signup')}}>Signup</Dropdown.Item>
                      
                    </Dropdown.Menu>
                  </Dropdown>
                  
                : 
                <Dropdown >
                <Dropdown.Toggle variant="success" id="dropdown-basic" className='h-11 flex flex-row'>
                  <div className='flex'>
                    <img className='w-8 h-8 mx-2 rounded-full object-cover' src={profile_pic !== null ? profile_pic : 'https://www.svgrepo.com/show/507597/circle.svg'} alt="" />
                  <p className='mx-2'>{username !== null && username}</p>
                  </div>
                
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item >Edit Profile</Dropdown.Item>
                  <Dropdown.Item onClick={() =>{signout()}}>SignOut</Dropdown.Item>
                  
                </Dropdown.Menu>
              </Dropdown>}
                  
                </div>
                  

                 
                  
          </Nav>
          <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tools</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ overflowY: 'auto' }}>
          
        <Offcanvas.Body >
        <Card onClick={() => { navigate('/randomLoveTips'); }}>
          <Card.Img variant="top" className='w-[160px] h-[140px]' src={'https://experiencecamps.org/wp-content/uploads/2024/02/hearts.jpg'} />
          <Card.Body>
            <Card.Title>Unlocking Cupid's Code: Random Love Tips</Card.Title>
            <Card.Text>
            Discover unexpected ways to ignite sparks and deepen connections. 
            From surprising compliments to spontaneous adventures, 
            these tips will keep love alive and thriving. 
            Explore the unexpected and watch love blossom in delightful ways.
            </Card.Text>
          </Card.Body>
        </Card>
        </Offcanvas.Body>

        <Offcanvas.Body>
        <Card onClick={() => { navigate('/showLoyalty'); }}>
          <Card.Img variant="top" className='w-[160px] h-[140px]' src={'https://miro.medium.com/v2/resize:fit:1400/0*61kT5xGQjLwDArB1.png'} />
          <Card.Body>
            <Card.Title>Show Loyalty: Building Trust and Connection</Card.Title>
            <Card.Text>
            Loyalty is the cornerstone of any strong relationship. 
            Learn how to demonstrate unwavering support and commitment to your partner. 
            From staying true through thick and thin to prioritizing their needs, 
            discover the key actions that strengthen the bond of trust. 
            Dive into the depths of loyalty and watch your relationship flourish with resilience and connection
            </Card.Text>
          </Card.Body>
        </Card>
        </Offcanvas.Body>


        <Offcanvas.Body>
        <Card onClick={() => { navigate('/expressFeelings'); }}>
          <Card.Img variant="top" src={'https://static.vecteezy.com/system/resources/previews/016/185/453/non_2x/smile-icons-set-cartoon-emoji-set-smiley-faces-with-different-emotions-illustration-vector.jpg'} />
          <Card.Body>
            <Card.Title>Expressing Feelings: The Language of Love</Card.Title>
            <Card.Text>
            Communication is the heartbeat of every relationship, 
            and expressing your feelings is key to deepening intimacy. 
            Learn how to articulate your emotions with honesty, vulnerability, and empathy. 
            From heartfelt conversations to love letters that speak volumes, explore the myriad ways to convey your innermost thoughts and desires. 
            Unlock the power of emotional connection and watch your relationship thrive with understanding and closeness.
            </Card.Text>
          </Card.Body>
        </Card>
        </Offcanvas.Body>

        </Offcanvas.Body>
        
      </Offcanvas>

      
    
    </>
    
  )
}

export default Navbar