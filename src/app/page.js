import React from 'react'
import Hero from '@/Components/Hero/Hero'
import About from '@/Components/About/About'
import Students from '@/Components/Students/Students'
import Courses from '@/Components/Courses/Courses'
import Trophies from '@/Components/Trophies/Trophies'
import Form from '@/Components/Form/Form'
import Mentors from '@/Components/Mentors/Mentors'
import Offer from '@/Components/Offer/Offer'
import OurTeam from '@/Components/OurTeam/OurTeam'
import Partners from '@/Components/Partners/Partners'
import Consultation from '@/Components/Consultation/Consultation'
import Contacts from '@/Components/Contacts/Contacts'
import Footer from '@/Components/Footer/Footer'

const page = () => {
  return (
    <div>
      <Hero />
      <About />
      <Students />
      <Courses />
      <Trophies />
      <Form />
      <Mentors />
      <Offer />
      <OurTeam />
      <Partners />
      <Consultation />
      <Contacts />
      <Footer />
    </div>
  )
}

export default page