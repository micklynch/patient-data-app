<template>
  <div class="patient-data">
    <h1>{{msg}}</h1>
    <p>
      Data from your Hospital
    </p>
    Imaging Study: {{imagingStudy.data.description}}
  </div> 
</template>

<script>
export default {
  name: 'PatientData',
  props: {
    msg: String
  },
  data () {
    return {
      patient: null,
      imagingStudy: null
    }
  },
  mounted () {
    let uri = 'http://hapi.fhir.org/baseDstu3/'
    let imagingStudyId = '219226'

    
    // Get XR
    this.axios
      .get(uri+'ImagingStudy/'+imagingStudyId+'?_format=json&_pretty=true')
      .then(response => (this.imagingStudy = response))
      .catch(error => console.log(error));
  },
  methods: {
    share: function(index) {
      console.log(index);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
