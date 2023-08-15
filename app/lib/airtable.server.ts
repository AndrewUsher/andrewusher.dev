import Airtable from 'airtable'

const base = Airtable.base('appSBBeNjLaqKqTAP')

type ContactInfo = {
  body: string | null
  email: string | null
  name: string | null
  subject: string | null
}

const addContactToTable = async ({
  body,
  email,
  name,
  subject,
}: ContactInfo) => {
  if (body && email && name && subject) {
    base('Table 1').create(
      [
        {
          fields: {
            Body: body,
            Email: email,
            Name: name,
            Subject: subject,
          },
        },
      ],
      { typecast: false },
      (err) => {
        if (err) {
          console.error(err)
          throw err
        }
      }
    )
  }
}

export { addContactToTable }
