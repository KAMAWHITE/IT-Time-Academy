import CoursesSection from '@/Components/Courses/CoursesHeader'
import Offer from '../../Components/Offer/Offer'
import React from 'react'
import FooterSection from '@/Components/Footer/Footer'

const page = () => {
  return (
    <div>
      <CoursesSection />
      <Offer />
      <FooterSection />
    </div>
  )
}

export default page