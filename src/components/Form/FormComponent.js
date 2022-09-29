import React,{useState,useMemo} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './FormComponent.css'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import Axios from 'axios'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default function FormComponent() {
  const { width, height } = useWindowSize()
  const [confetti,setconfetti]=useState(false)
  const obj={
    firstName:"",
    middleLastName:"",
    sexualOrientation:"",
    emailAddress:"",
    dateOfBirth:"",
    addressFirstLine:"",
    addressSecondLine:"",
    addressCity:"",
    addressCountry:"",
    addressPostalCode:"",
    APIKey:"BZm37rvAkTfhTx9v4UlBMiKUid2ngmQi61PvkduD7yadNLx2ljuvBuyU4Ae7js1P"
  }
  const [form,setForm]=useState(obj)

  const Reset=()=>{
    setForm(obj)
  }

  const [errors,setErrors]=useState({})


  const options = useMemo(() => countryList().getData(), [])

 
  const url="https://alpinespringsinterncandidateapi.onrender.com/basicform"





  const setField=(field,value)=>{
    setForm({
      ...form,
      [field]:value
    })

    if(!!errors[field]){
      setErrors({
        ...errors,
        [field]:null
      })
    }
  }

  
  const validateForm=()=>{
    const {firstName,middleLastName,emailAddress,sexualOrientation,dateOfBirth,addressFirstLine,addressSecondLine,addressCity,addressCountry,addressPostalCode}=form
    const newErrors={}

    if(!firstName || firstName==='') newErrors.firstName='Enter details'
    if(!middleLastName || middleLastName==='') newErrors.middleLastName='Enter details'
    if(!emailAddress || emailAddress==='') newErrors.emailAddress='Enter the email'
    if(!sexualOrientation || sexualOrientation==='') newErrors.sexualOrientation='Enter gender'
    if(!dateOfBirth || dateOfBirth==='') newErrors.dateOfBirth='Enter dob'
    if(!addressFirstLine || addressFirstLine==='') newErrors.addressFirstLine='Enter address'
    if(!addressSecondLine || addressSecondLine==='') newErrors.addressSecondLine='Enter address'
    if(!addressCity || addressCity==='') newErrors.addressCity='Enter city'
    if(!addressCountry || addressCountry==='') newErrors.addressCountry='Enter city'
    if(!addressPostalCode || addressPostalCode==='') newErrors.addressPostalCode='Enter city'

    return newErrors
  }

  const handleSubmit=(e)=>{
    e.preventDefault()

    const formErrors=validateForm()
    if(Object.keys(formErrors).length>0){
      setErrors(formErrors)
    }else{
      setconfetti(true)
      Axios.post(url,{
        firstName:form.firstName,
        middleLastName:form.middleLastName,
        sexualOrientation:form.sexualOrientation,
        emailAddress:form.emailAddress,
        dateOfBirth:form.dateOfBirth,
        addressFirstLine:form.addressFirstLine,
        addressSecondLine:form.addressSecondLine,
        addressCity:form.addressCity,
        addressCountry:form.addressCountry,
        addressPostalCode:form.addressPostalCode,
        APIKey:"BZm37rvAkTfhTx9v4UlBMiKUid2ngmQi61PvkduD7yadNLx2ljuvBuyU4Ae7js1P"
      }).then(res=>{
        
      })
      setTimeout(()=>{
        setForm(obj)
        setconfetti(false)
      },6000)
    }
  }
  
  return (
    
    <Form className="roger-form">
      {confetti && <Confetti
      width={width}
      height={height}
      tweenDuration={5000}
    />}
      <h1 style={{fontFamily:'cursive',marginBottom:'50px'}}>Register Here</h1>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="FirstName">
          <Form.Label style={{fontFamily:'cursive',fontWeight:"bolder"}}>First Name</Form.Label>
          <Form.Control 
          type="FirstName" 
          placeholder="Enter FirstName"
          onChange={e=>setField("firstName",e.target.value)}
          value={form.firstName}
          isInvalid={!!errors.firstName}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="middleLastName">
          <Form.Label style={{fontFamily:'cursive',fontWeight:"bolder"}}>MiddleLastName</Form.Label>
          <Form.Control 
          type="middleLastName" 
          placeholder="Enter LastName"
          value={form.middleLastName}
          onChange={e=>setField("middleLastName",e.target.value)}
          isInvalid={!!errors.middleLastName}
           />
          <Form.Control.Feedback type='invalid'>
            {errors.middleLastName}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-6">
        <Form.Group as={Col} controlId="emailAddress">
          <Form.Label style={{fontFamily:'cursive',fontWeight:"bolder"}}>Email</Form.Label>
          <Form.Control 
          type="email" 
          placeholder="Enter email"
          value={form.emailAddress}
          onChange={e=>setField("emailAddress",e.target.value)}
          isInvalid={!!errors.emailAddress}
           />
           <Form.Control.Feedback type='invalid'>
            {errors.emailAddress}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="sexualOrientation">
          <Form.Label style={{fontFamily:'cursive',fontWeight:"bolder"}}>Gender</Form.Label>
          <Form.Select 
          placeholder="Gender"
          defaultValue="Gender"
          value={form.sexualOrientation}
          onChange={e=>setField("sexualOrientation",e.target.value)}
          isInvalid={!!errors.sexualOrientation}
          >
            <option styles={{color:'muted'}}>Enter Gender</option>
            <option>Female</option>
            <option>Male</option>
            <option>Others</option>
          </Form.Select>
          <Form.Control.Feedback type='invalid'>
            {errors.sexualOrientation}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="dateOfBirth">
          <Form.Label style={{fontFamily:'cursive',fontWeight:"bolder"}}>DateOfBirth</Form.Label>
          <Form.Control 
          placeholder="Date Of Birth"
          type="date" 
          value={form.dateOfBirth}
          onChange={e=>setField("dateOfBirth",e.target.value)}
          isInvalid={!!errors.dateOfBirth}
           />
           <Form.Control.Feedback type='invalid'>
            {errors.dateOfBirth}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label style={{fontFamily:'cursive',fontWeight:"bolder"}}>Address 1</Form.Label>
        <Form.Control 
        placeholder="1234 Main St"
        value={form.addressFirstLine}
        onChange={e=>setField("addressFirstLine",e.target.value)}
        isInvalid={!!errors.addressFirstLine}
         />
         <Form.Control.Feedback type='invalid'>
            {errors.addressFirstLine}
          </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label style={{fontFamily:'cursive',fontWeight:"bolder"}}>Address 2</Form.Label>
        <Form.Control 
        placeholder="Apartment, studio, or floor"
        value={form.addressSecondLine}
        onChange={e=>setField("addressSecondLine",e.target.value)}
        isInvalid={!!errors.addressSecondLine}
         />
        <Form.Control.Feedback type='invalid'>
            {errors.addressSecondLine}
          </Form.Control.Feedback>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label style={{fontFamily:'cursive',fontWeight:"bolder"}}>City</Form.Label>
          <Form.Control 
           placeholder="City"
           value={form.addressCity}
           onChange={e=>setField("addressCity",e.target.value)}
           isInvalid={!!errors.addressCity}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.addressCity}
          </Form.Control.Feedback>
        </Form.Group>

        {/* <Form.Group as={Col} controlId="addressCountry">
          <Form.Label>addressCountry</Form.Label>
          <Form.Select 
          defaultValue="Choose..." 
          type="location"
          value={form.country}
          onChange={e=>setField("country",e.target.value)}
          isInvalid={!!errors.country}
          >
          </Form.Select>
          <Form.Control.Feedback type='invalid'>
            {errors.country}
          </Form.Control.Feedback>
        </Form.Group> */}
        <Form.Group as={Col}>
        <Form.Label style={{fontFamily:'cursive',fontWeight:"bolder"}}>Country</Form.Label>
        <Select 
        options={options} 
        type="location"
        value={form.addressCountry}
        onChange={(selected)=>{
          setField('addressCountry',selected)
        }}
        styles={{position:'fixed'}}/>
         <div className='red'>{errors.addressCountry}</div>
         <Form.Control.Feedback type='invalid'>
            {errors.addressCountry}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group as={Col} controlId="addressPostalCode">
          <Form.Label style={{fontFamily:'cursive',fontWeight:"bolder"}}>Postal Code</Form.Label>
          <Form.Control
          value={form.addressPostalCode}
          onChange={e=>setField("addressPostalCode",e.target.value)}
          isInvalid={!!errors.addressPostalCode}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.addressPostalCode}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Button variant="danger" size="lg" type="reset" onClick={Reset}>
        Reset
      </Button>{' '}
      <Button variant="primary" type="submit" size="lg" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  )
}