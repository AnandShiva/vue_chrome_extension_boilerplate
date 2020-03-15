<template>
  <div :id="container_id" class="any_style_class">
    Any Content to be injected into the page
  </div>
</template>

<script>

const CONSTANTS = require('../constants/constants.json');

debugger;
export default {
  data() {
    return {
      container_id: CONSTANTS.IDS.PRIMARY_CONTAINER_ID,
    };
  },
  created() {

  },
  components: {
  },
  methods: {
  },
};
</script>

<style lang="scss">

.any_style_class {
  visibility: 'hidden';
  position: 'fixed';
  bottom: '5rem';
  right: '5rem';
  width: '10%';
  height: '10%';
  background-color: '#F5F7FA';
}

html {

}
</style>
