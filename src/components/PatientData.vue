<template>
  <div class="patient-data">
    <h1>{{msg}}</h1>
    <ul>
  <li v-for="(patientdataitem, index) in patientdataitems" :key="index">
    <div class="md-card">
      <div class="md-card-content">
         <md-card-header>
        <md-card-header-text>
        <div class="md-title">{{patientdataitem.data.resourceType}} </div> 
        </md-card-header-text></md-card-header>
          <p><b>Last Updated:</b> {{patientdataitem.data.meta.lastUpdated}} </p>
          <p> <b>Item ID:</b> {{patientdataitem.data.id}}</p>
          <!-- <p>{{patientdataitem.data}} </p> -->
          <p><b>Shared With: </b>Dr. Murphy, Hospital ABC, +1 more... </p>
          <md-card-actions>
            <md-button class="md-icon-button md-raised md-accent" @click="showDialog = true"><md-icon>share</md-icon></md-button>
          </md-card-actions>
      </div>
    </div>
    </li>
    </ul>

  <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Preferences</md-dialog-title>
      <p>This is a dialog for hopefully sharing some data</p>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
      </md-dialog-actions>
  </md-dialog>
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
      showDialog: false,
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

.md-card {
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
  text-align: left;
  padding: 1rem;
}

.md-dialog {
  padding: 2rem 2rem 2rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0.375rem;
}

.md-button {
  align-self: right;
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
