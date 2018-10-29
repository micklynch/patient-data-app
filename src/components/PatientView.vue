<template>
  <div id="patient">
    <div class="logo"><img alt="Logo" src="../assets/logo.png"></div>
    <div class = "md-card">
      <div class = "md-card-content">
        <h2 v-if="patient.data">Name: {{patient.data.name[0].given[0]+" "+patient.data.name[0].family}}</h2>
        <h3 v-if="patient.data">Medical Record Number: {{patient.data.identifier[0].value}}</h3>
      </div>
    </div>
    <PatientData msg="My Data"/> <!-- this prop could be used as a means to display another person's data (i.e. "John's Data") -->
    <Footer />
  </div>
</template>

<script>
import PatientData from './PatientData.vue'
import ConnectPage from './ConnectPage.vue'
import connectFhir from '../IO/connectFhir'

export default {
  name: "PatientView",
  components: {
    PatientData,
    ConnectPage
  },
  data() {
    return {
      patient: null
    };
  },
  created: function() {
    this.patient = JSON.parse(
      localStorage.getItem("patientAppLocalStorage") || "[]"
    );
  },
  async mounted() {
    this.patient = await connectFhir.getFhirPatient()
    this.updateLocalStorage()
  },
  methods: {
    //...
    updateLocalStorage: function() {
      localStorage.setItem(
        "patientAppLocalStorage",
        JSON.stringify(this.patient)
      );
    }
  },
  watch: {
    patient: {
      handler() {
        this.updateLocalStorage();
      },
      deep: true
    }
  }
};
</script>

<style>
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
  max-width: 520px;
  margin: 8px;
  display: inline-block;
  vertical-align: top;
}

.md-card-content {
  text-align: center;
  padding: 1rem;
}

</style>
