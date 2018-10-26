<template>
  <div id="app">
    <transition name="component-fade" mode="out-in">
      <router-view /> 
    </transition>
    <Footer />
  </div>
</template>

<script>
import PatientView from './components/PatientView.vue'
import Footer from './components/Footer.vue'

export default {
  name: "app",
  components: {
    PatientView,
    Footer
  },
  data() {
    return {
    };
  }
};
</script>

<style>
/*body {
  background: linear-gradient(limegreen, transparent),
    linear-gradient(90deg, skyblue, transparent),
    linear-gradient(-90deg, coral, transparent);
  background-blend-mode: screen;
}*/

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}

</style>
