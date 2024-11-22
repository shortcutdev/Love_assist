import {React, useEffect, useState} from 'react'
import { useNavigate  } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import AddPartnerOne from '../modals/AddPartnerOne';
import Card from 'react-bootstrap/Card';
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { app } from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL,  } from'firebase/storage';
import {getFirestore,  doc, setDoc, getDoc,collection, getDocs  } from "firebase/firestore"; 

function Home() {
  const [isLoading, setLoading] = useState(false);
  const [newuser, setnewuser] = useState(false);
  const [age, setage] = useState('Age-group');
  const [name, setname] = useState('');
  const [username, setusername] = useState('');
  const [gender, setgender] = useState('Gender');
  const [showAddPartnerModal, setshowAddPartnerModal] = useState(false);
  const [addpartnermodaldata, setaddpartnermodaldata] = useState(null);
  const [downloadurl, setdownloadurl] = useState('');
  const [image, setimage] = useState();
  const [uid, setuid] = useState('');
  const [loadnavbar, setloadnavbar] = useState(false);
  const [partners, setpartners] = useState([]);

  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app)
  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }
    if (isLoading) {
      simulateNetworkRequest().then(() => {
      setLoading(false);
      });
    }

    
    const get_login_user = async() =>{
      
      onAuthStateChanged(auth, (user) => {
        if (user.displayName === '' || user.photoURL === '') 
        setnewuser(true)
      if (user) {
       console.log('userdata',user);
        setimage(user.photoURL)
        //alert(user.photoURL)
        setuid(user.uid);
        //console.log(user.uid);
        setusername(user.displayName)
        get_user_data(user.uid)
        get_partners(user.uid)
        localStorage.setItem('user_id', user.uid)

      } else {
        //alert('no user')
      }
    
  });
  
    }

    const get_user_data = async(id) =>{
      const docRef = doc(db, "User_info", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setname(docSnap.data().Nick_name)
        setgender(docSnap.data().Gender)
        setage(docSnap.data().Age_group)
      } else {
        // docSnap.data() will be undefined in this case
       // console.log("No such document!");
      }
    }

    const get_partners = async(id) =>{
      try {
        const querySnapshot = await getDocs(collection(db, `User_info/${id}/partner`));
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        setpartners(documents);
        console.log('partners',documents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching documents: ', error);
      }
    }
       
      //get_user_data()
      get_login_user()
      get_partners()
      
  }, [isLoading]);

const update_profile = async() =>{
  
  await setDoc(doc(db, "User_info", uid), {
    Nick_name : name === '' ? username : name,
    Gender : gender,
    Age_group : age,
    Targets : [{Partner: 'Partner1',
                Name : 'example',
                Age : 'age',
                Relation : 'relation'
              }]

  });
   
  await updateProfile(auth.currentUser, {
    displayName: name, 
    photoURL: downloadurl !== '' ? downloadurl:'',

  }).then(() => {
    setnewuser(false)
    setLoading(true)
  }).catch((error) => {
    // An error occurred
    // ...
  });
  //setLoading(true)
  console.log("clicked");
}

const uploadPic = async(event) => {
  const storage = getStorage()
  const file = event.target.files[0];
  const fileRef = ref(storage, `/Profile_pics/${file.name}`);
  
  uploadBytes(fileRef, file).then((snapshot) => {

    getDownloadURL(fileRef).then((url) => {
      setdownloadurl(url)
    });
    setloadnavbar(true)
  }).catch((error) => {
    console.error('Error uploading file:', error);
  });


};

const handleCloseModal = () => {
  setshowAddPartnerModal(false);
};
const handleModalData = (data) => {
  setaddpartnermodaldata(data);
};
  return (
    <>
    <Navbar reload={loadnavbar}></Navbar>
    {newuser ?
    <div>
       <div className='flex justify-center items-center mt-[50px]'>
      <h2>User Details</h2>
    </div>
    <div className='flex justify-center items-center mt-[50px]'>
      <img className='w-[200px] h-[200px] mx-[20px] rounded-full object-cover' src={image !== '' ?image:'https://www.svgrepo.com/show/532681/circle.svg'} alt="" />
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Choose your profile pic</Form.Label>
        <Form.Control type="file" onChange={uploadPic}/>
      
      </Form.Group>
      
    </div>
    
    <div className='flex justify-center items-center mt-[50px]'>
    <FloatingLabel 
        controlId="floatingInput"
        label= {name === '' ? username : name} 
        className=" mx-3"
      >
        <Form.Control type="email" placeholder="name@example.com" onChange={(e) =>{setname(e.target.value)}} />
      </FloatingLabel>



    <Dropdown className='mx-4'>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {gender}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>{setgender('Male')}}>Male</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setgender('Female')}}>Female</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {age}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>{setage('20-39')}}>20-39</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setage('40-59')}}>40-59</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setage('60+')}}>60+</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>

    <div className='flex justify-center items-center mt-[50px]'>
      {
      name !== null && gender !== 'Gender' && age !== 'Age-group' && 
      
        <p>Hi there! my name is {name}, and I identify as a {gender}. I am in the {age} age group.</p>
      }
      
    </div>

    <div className='flex justify-center items-center mt-[30px]'>
          <Button onClick={() =>{update_profile()}} variant="success">Add User Details</Button>{' '}
    </div>   
    </div> 
    
    :
    
    <div>
       <div className='flex flex-col justify-center items-center mt-[50px]'>
       
            <h1 className='my-[10px]'>User Details</h1>
         
          
            <img className='w-[200px] h-[200px] mx-[20px] my-[20px] rounded-full object-cover' src={image !== '' ?image:'https://www.svgrepo.com/show/532681/circle.svg'} alt="" />
            
            
    <div className='m-2 flex flex-col justify-between'>
            <h2 className='flex'>
            <Badge  bg="success">Name</Badge>
            <Form.Control
        type="text"
        placeholder={name === '' ? username : name}
        aria-label="Disabled input example"
        readOnly
      />
          </h2>
          <h2 className='flex'>
            <Badge  bg="success">Age-Group</Badge>
            <Form.Control
        type="text"
        placeholder={age}
        aria-label="Disabled input example"
        readOnly
      />
          </h2>

          <h2 className='flex'>
            <Badge  bg="success">Gender</Badge>
            <Form.Control
        type="text"
        placeholder={gender}
        aria-label="Disabled input example"
        readOnly
      />
          </h2>
       </div>
       
        <h2 className='my-[14px]'>
    My Partners
  </h2>
<div className='grid grid-cols-3 gap-4'>
 
      {partners !== null && partners.map((item) =>(
            
            
              <Card 
              className="transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() =>{
                
                const data = new URLSearchParams({id:item.id, update:'newId'}).toString();
                navigate(`/partner?${data}`);}}>
                    
                    <Card.Body>
                      <div className='flex flex-row '> 
                        <img className='w-[40px], h-[40px] mx-[12px]' variant="top" src={item.Picture} />
                        <div>
                          <h2>{item.Name} </h2>
                          <div className='flex flex-row space-x-2'>
                            <p>Age : {item.Age} </p>
                            <p>Gender  : {item.Gender} </p>
                            <p>Mindset : {item.Mindset} </p>
                            <p>Relation : {item.Relation}</p>
                          </div>
                        </div>
                      </div>

                    </Card.Body>
                  </Card>
             

      ))
        
      
      
      }
      </div> 

       <div className='flex justify-between m-2'>
        <h2>
          <Button onClick={() =>{setnewuser(true)}} className='mx-3' variant="primary">Edit Details</Button>{' '}
          <Button onClick={()=>{setshowAddPartnerModal(true)}} variant="primary">+ Add Partner</Button>{' '}
        </h2>
       
       </div>
    
       </div>
          <div>
            
          </div>
          
       <p>{addpartnermodaldata}</p>
    </div>
    
    }

    
      <AddPartnerOne
      senddata = {handleModalData}
        show ={showAddPartnerModal}
        onHide ={handleCloseModal}
        id = {uid}
      ></AddPartnerOne>

   
   
    

    </>
    

  )
}

export default Home