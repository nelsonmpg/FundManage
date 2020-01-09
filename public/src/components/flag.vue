<template>
  <div class="ml-5 text-center" cols="2">
    <CIcon :height="42" :name="'cif-' + country.alpha2Code.toLowerCase()" />
    <p>{{ country.name }}</p>
  </div>
</template>
<script>
export default {
  props: ["country"],
  name: "flag"
};
</script>
