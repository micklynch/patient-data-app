// Here is what you connect to FHIR databast
const axios = require('axios')

const uri = "http://hapi.fhir.org/baseDstu3/";

const getFhirData = async () => {

    let links = [
        "Appointment/257258",
        "MedicationStatement/272393",
        "Procedure/FJF0000212311901F5",
        "Medication/FJF0000212311901C1"
      ];
    
    let FhirData = [];

    links.forEach(async(link) => {
      // Get data
      try {
      let response = await axios.get(uri + link + "?_format=json&_pretty=true");
      FhirData.push({ fhir: response });
      } catch (e) {
          console.error(e)
      }
    });

    return await new Promise(resolve => {
        resolve(FhirData);
    });
}

const getFhirPatient = async() => {
    let patientId = "Patient/42221"
    let FhirPatient;
    // Get data
    try {
        FhirPatient = await axios.get(uri + patientId + "?_format=json&_pretty=true");
    } catch (e){
        console.error(e)       
    }
    return await new Promise(resolve => {
        resolve(FhirPatient)
    });
}

export default {
    getFhirPatient,
    getFhirData
};