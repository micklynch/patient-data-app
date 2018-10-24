<template>
  <div class="patient-data">
    <h1>{{msg}}</h1>
    <ul>
  <li v-for="(patientdataitem, index) in patientdataitems" :key="index">
    <div class="md-card">
      <div class="md-card-content">
         <md-card-header>
        <md-card-header-text>
        <div class="md-title">{{patientdataitem.fhir.data.resourceType}} </div> 
        </md-card-header-text></md-card-header>
          <p><b>Last Updated:</b> {{patientdataitem.fhir.data.meta.lastUpdated}} </p>
          <p> <b>Item ID:</b> {{patientdataitem.fhir.data.id}}</p>
           <!--p>{{patientdataitem.fhir.data}} </p> -->
          <p v-if="patientdataitem.shares"><b>Shared With: </b>{{patientdataitem.shares.join(", ")}} </p>
          <md-card-actions>
            <md-button class="md-icon-button md-raised md-accent" @click="showDialog = true; selectedItem=index"><md-icon>share</md-icon></md-button>
          </md-card-actions>
      </div>
    </div>
    </li>
    </ul>

  <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Sharing your Data</md-dialog-title>
      <form>
        <md-card>
          <md-card-content>
            <md-field>
              <label>First name</label>
              <md-input v-model="form.drfirstname"></md-input>              
            </md-field>
            <md-field>
              <label>Last name</label>
              <md-input v-model="form.drlastname"></md-input>
            </md-field>
            <md-field>
              <label>Email</label>
              <md-input v-model="form.dremail" type="email"></md-input>
            </md-field>
          </md-card-content>
        </md-card>
      </form>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false; share(selectedItem)">Close</md-button>
      </md-dialog-actions>
  </md-dialog>
  </div> 

</template>

<script>
import connectFhir from '../../src/IO/connectFhir'

export default {
  name: "PatientData",
  props: {
    msg: String
  },
  data() {
    return {
      showDialog: false,
      patientdataitems: null,
      selectedItem: null,
      form: {
        drfirstname: null,
        drlastname: null,
        dremail:null
      },
    };
  },
  async mounted() {
    if (localStorage.getItem('patientDataAppLocalStorage')) {
      this.patientdataitems = JSON.parse(localStorage.getItem('patientDataAppLocalStorage'));
    } else {
      this.patientdataitems = await connectFhir.getFhirData();
    }
  },
  created: function() {
    this.patientdataitems = JSON.parse(
      localStorage.getItem("patientDataAppLocalStorage") || "[]"
    );
  },
  methods: {
    share: function(index) {
      if (this.patientdataitems[index].shares) {
        this.patientdataitems[index].shares.push(this.form.drfirstname+" "+this.form.drlastname);
      } else {
        this.patientdataitems[index].shares = [this.form.drfirstname+" "+this.form.drlastname];
      }
      this.updateLocalStorage()
      this.form.drfirstname = null
      this.form.drlastname = null
      this.form.dremail = null
    },
      //...
    updateLocalStorage: function() {
      localStorage.setItem("patientDataAppLocalStorage", JSON.stringify(this.patientdataitems));
    }
  },
  // local storage https://medium.com/@vince_umo_34593/vue-js-101-todo-pwa-tutorial-ea96eb4e64b1
  watch: {
    patientdataitems: {
      handler() {
        this.updateTodoLocalStorage();
      },
      deep: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-card {
  /*padding: 2rem 2rem 2rem 2rem;*/
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
