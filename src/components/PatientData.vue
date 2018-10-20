<template>
  <div class="patient-data">
    <h1>{{msg}}</h1>
    <ul>
  <li v-for="(patientdataitem, index) in patientdataitems" :key="index">
    <div class="container">
    <div class="datacard">
      <div class="data-details">
        <h4>{{patientdataitem.data.resourceType}} - {{patientdataitem.data.id}} - {{patientdataitem.data.meta.lastUpdated}} </h4>
        {{patientdataitem.data}} 
      </div>
    </div>
    </div>
    </li>
    </ul>
  </div> 
</template>

<script>
export default {
  name: "PatientData",
  props: {
    msg: String
  },
  data() {
    return {
      patientdataitems: null
    };
  },
  mounted() {
    let uri = "http://hapi.fhir.org/baseDstu3/";
    let links = [
      "Appointment/257258",
      "MedicationStatement/272393",
      "Procedure/FJF0000212311901F5",
      "Medication/FJF0000212311901C1"
    ];
    console.log(links);
    this.patientdataitems = [];

    links.forEach(link => {
      // Get data
      this.axios
        .get(uri + link + "?_format=json&_pretty=true")
        .then(response => this.patientdataitems.push(response))
        .catch(error => console.log(error));
    });
  },
  methods: {
    share: function(index) {
      console.log(index);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding: 8px;
}
.datacard {
  background: rgba(255, 255, 255, 0.493);
  box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
  border-radius: 0.375rem;
  color: #4d3939;
  align-items: center;
}

.data-details {
  text-align: left;
  padding: 1rem;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
