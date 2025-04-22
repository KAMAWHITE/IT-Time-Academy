import ContactSection from '@/Components/Contacts/ContactHeader'
import Contacts from '@/Components/Contacts/Contacts'
import FooterSection from '@/Components/Footer/Footer'
import React from 'react'

const page = () => {
  return (
    <div>
      <ContactSection />
      <Contacts />
      <FooterSection />
    </div>
  )
}

export default page