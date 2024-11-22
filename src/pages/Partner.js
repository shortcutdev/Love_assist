import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import AddPartnerThree from '../modals/AddPartnerThree';
import { useNavigate  } from 'react-router-dom';
import { app } from '../firebase';
import {getFirestore,  doc, updateDoc, arrayUnion, getDoc  } from "firebase/firestore"; 

function Partner() {
  const [downloadurl, setdownloadurl] = useState('');
  const [data, setdata] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [openmodal3, setopenmodal3] = useState(false);
  const [age, setage] = useState('');
  const [name, setname] = useState('');
  const [relation, setrelation] = useState('');
  const [gender, setgender] = useState('');
  const [mindset, setmindset] = useState('');
  const [id, setid] = useState('');


  const db = getFirestore(app)
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }
    
    if (isLoading) {
      simulateNetworkRequest().then(() => {
      setLoading(false);
      });
    }


      setid(localStorage.getItem('user_id'))
     // getdata()
      //console.log(localStorage.getItem('user_id'),'param data',params.get('id'));

      get_user_data(localStorage.getItem('user_id'), params.get('id'))
  }, [isLoading, params.get('update')]);
    
    const navigate = useNavigate();

    const handleCloseModal = () => {
      setopenmodal3(false);
    };



   

  const get_user_data = async(id, userid) =>{
    const docRef = doc(db, `User_info/${id}/partner`, userid);
    console.log('db',docRef);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setname(docSnap.data().Name)
      setgender(docSnap.data().Gender)
      setage(docSnap.data().Age)
      setrelation(docSnap.data().Relation)
      setmindset(docSnap.data().Mindset)
      setdownloadurl(docSnap.data().Picture)
      setdata([docSnap.data().Name,docSnap.data().Age,docSnap.data().Gender,docSnap.data().Relation,docSnap.data().Mindset])

      await updateDoc(doc(db, "User_info", id), {
        Targets: arrayUnion({
          name : name,
          relation : relation,
          id : userid
        })
      });
    } else {
      // docSnap.data() will be undefined in this case
     // console.log("No such document!");
    }
  }


    const menudata = [
        {'img':'https://socialself.com/wp-content/uploads/2021/04/approaching-people-649x365.png?ezimgfmt=rs:372x209/rscb7/ng:webp/ngcb7',
        'desc':'Tips for Navigating Social Waters',
        'nav' : 'tips'
      }, 
        {'img':'https://a-static.besthdwallpaper.com/the-letter-of-timeless-love-wallpaper-2048x768-25141_85.jpg',
        'desc':'Expressions for Every Moment',
        'nav' : 'tips'
      },
        {'img':'https://www.franksonnenbergonline.com/wp-content/uploads/2023/10/image_how-to-impress-everyone-you-meet.jpg',
        'desc':'Strategies for Impressing with Grace',
        'nav' : 'tips'
      },
        {'img':'https://img.poemhunter.com/i/poem_image/21/41431121_poem_85.jpg',
        'desc':'A Celebration of Poetic Expression',
        'nav' : 'tips'
      },
        {'img':'https://marketplace.canva.com/EAFd7nH2KyA/1/0/1600w/canva-minimal-modern-you-are-enough-quote-desktop-wallpaper-uR1_BcMWcH4.jpg',
        'desc':'Short, Sweet, and Memorable',
        'nav' : 'tips'
      },
    ]

    
  return (
    <>
    <Navbar></Navbar>
    <div>
       <div className='flex flex-col mx-3 mt-[50px]'>
        <div className='flex justify-between'>

        <div className='w-1/2'>

       
            <h1 className='my-[10px]'>User Details</h1>
         
            <div className='flex'>
                <img className='w-[200px] h-[200px] mx-[20px] my-[20px] rounded-full object-cover' src={downloadurl !== '' ? downloadurl :'https://www.svgrepo.com/show/532681/circle.svg'} alt="" />

              </div> 
          
            
    <div className='m-2 flex flex-col justify-between'>
      {['Name','Age-group','Gender','Relation','Mindset'].map((items,idx) =>(
        <h2 className='flex'>
            <Badge  bg="success">{items}</Badge>
            <Form.Control
        type="text"
        placeholder={data[idx]}
        aria-label="Disabled input example"
        readOnly
      />
          </h2>
      ))}
            
       
       </div>

       <div className='flex justify-between m-2'>
        <h2>
          <Button className='mx-3' variant="primary" onClick={() =>{setopenmodal3(true)}}>Edit Details</Button>{' '}
          
        </h2>
       
       </div>
        </div>
        <div className='w-1/2'>
            <h1 className=' mx-5 mb-5'>I am inneed of  </h1>
           <div className='mx-5 grid grid-cols-3 gap-4'>
            {['Tips','Letters','Impress','Poem','Catchlines'].map((items,idx) =>(
                <Card key={idx}>
            <Card.Img variant="top" className='w-[149px] h-[85px]' src={menudata[idx].img}   />
            <Card.Body>
                <Card.Title>{items}</Card.Title>
                <Card.Text>
                {menudata[idx].desc}
                </Card.Text>
                <Button onClick={() =>{navigate(`/${menudata[idx].nav}`)}} variant="primary">Lets find out</Button>
            </Card.Body>
            </Card>
            ))}
           

           </div>
        </div>
            </div>
       </div>

         
          
    </div>
          <AddPartnerThree
            editable = {true}
            name = {name}
            age = {age}
            nation = {relation}
            gender = {gender}
            mindset = {mindset}
            picurl = {downloadurl}
            show =  {openmodal3}
            id = {id}
            onHide ={handleCloseModal}
            partnerid = {params.get('id')}
          >
              
            </AddPartnerThree> 
    </>
  )
}

export default Partner