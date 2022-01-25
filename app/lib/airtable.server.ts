import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appSBBeNjLaqKqTAP')

type ContactInfo = {
  body: string;
  email: string;
  name: string;
  subject: string;
}

const addContactToTable = async ({ body, email, name, subject }: ContactInfo) => {
  base('Table 1').create([
    {
      fields: {
        Body: body,
        Email: email,
        Name: name,
        Subject: subject
      }
    }
  ], { typecast: false }, (err, record) => {
    if (err) {
      console.error(err)
      throw err
    } else {
      console.log(record)
    }
  })
}

export { addContactToTable }