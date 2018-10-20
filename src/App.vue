<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class = "usercard">
      <div class = "user-details">
    <h2>Name: {{patient.data.name[0].given[0]+" "+patient.data.name[0].family}}</h2>
    <h3>Medical Record Number: {{patient.data.identifier[0].value}}</h3>
    </div>
    </div>
    <PatientData msg="My Data"/>
  </div>
</template>

<script>
import PatientData from "./components/PatientData.vue";

export default {
  name: "app",
  components: {
    PatientData
  },
  data() {
    return {
      patient: null
    };
  },
  mounted() {
    let uri = "http://hapi.fhir.org/baseDstu3/";
    let patientId = "42221";

    // Get Patient
    this.axios
      .get(uri + "Patient/" + patientId + "?_format=json&_pretty=true")
      .then(response => (this.patient = response))
      .catch(error => console.log(error));
  }
};
</script>

<style>
body {
  background: linear-gradient(limegreen, transparent),
    linear-gradient(90deg, skyblue, transparent),
    linear-gradient(-90deg, coral, transparent);
  background-blend-mode: screen;
}

.usercard {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  margin: auto;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.493);
  box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
  border-radius: 0.375rem;
  color: #4d3939;
  align-items: center;
}

.user-details {
  padding: 1rem;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
