<template>
  <div id="app">
    <div class="logo"><img alt="Logo" src="./assets/logo.png"></div>
    <div class = "md-card">
      <div class = "md-card-content">
    <h2>Name: {{patient.data.name[0].given[0]+" "+patient.data.name[0].family}}</h2>
    <h3>Medical Record Number: {{patient.data.identifier[0].value}}</h3>
    </div>
    </div>
    <PatientData msg="My Data"/>
    <Footer />
  </div>
</template>

<script>
import PatientData from "./components/PatientData.vue"
import Footer from './components/Footer.vue'
import connectFhir from './IO/connectFhir';

export default {
  name: "app",
  components: {
    PatientData,
    Footer
  },
  data() {
    return {
      patient: null
    };
  },
  async mounted() {
    this.patient = await connectFhir.getFhirPatient()
  }
};
</script>

<style>
/*body {
  background: linear-gradient(limegreen, transparent),
    linear-gradient(90deg, skyblue, transparent),
    linear-gradient(-90deg, coral, transparent);
  background-blend-mode: screen;
}
*/
.logo {
  padding: 1rem;
}

.md-card {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  padding: 2rem 2rem 2rem 2rem;
  background: rgba(255, 255, 255, 0.493);
  border-radius: 0.375rem;
  color: #4d3939;
  align-items: left;
  max-width: 520px;
  margin: 8px;
  display: inline-block;
  vertical-align: top;
}

.md-card-content {
  text-align: center;
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
