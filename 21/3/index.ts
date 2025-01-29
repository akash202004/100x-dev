import axios from "axios";

function generateCollegeId() {
  return `222${Math.floor(10000000 + Math.random() * 90000000)}`;
}

async function sendBulkRequests() {
  let emailNo = 3;

  for (let i = 0; i < 100; i++) {
    emailNo++;
    let email = `a${emailNo}@nshm.edu.in`;
    let collegeId = generateCollegeId();

    let data = {
      name: "aaaa",
      collegeEmail: email,
      collegeId: collegeId,
      year: "2nd",
      department: "CSE",
      contactNumber: "1234567899",
      whatsappNumber: "1234567899",
    };

    try {
      let response = await axios.post(
        "https://registrationsystem-1a4m.onrender.com/api/register/",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(`✅ Success: ${email}`, response.data);
    } catch (error: any) {
      console.error(`❌ Failed: ${email}, Error: ${error.message}`);
    }
  }
}

sendBulkRequests();
