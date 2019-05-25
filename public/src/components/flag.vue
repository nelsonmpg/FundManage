<template>
  <div class="ml-5 text-center" cols="2">
    <i class="flag-icon h1" :class="'flag-icon-' + country.alpha2Code.toLowerCase()"></i>
    <p>{{ country.name }}</p>
  </div>
</template>
<script>
export default {
  props: ["country"],
  name: "flag"
};
</script>
