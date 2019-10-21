<template>
  <div class="hello">
    <h2>Team Profile</h2>

    <form class="container">
      <div class="row">
        <div class="formGroup col-4">
          <label for="school">School/Location</label>
          <input type="text" id="school" />
        </div>
        <div class="formGroup col-4">
          <label for="mascot">Name/Mascot</label>
          <input type="text" id="mascot" />
        </div>
        <div class="formGroup col-4">
          <label for="website">Website</label>
          <input type="url" id="website" />
        </div>
      </div>

      <div class="row">
        <div class="formGroup col-5">
          <label for="street_address">Street Address</label>
          <input type="text" id="street_address" />
        </div>
        <div class="formGroup col-5 offset-2">
          <label for="address_2">Address 2</label>
          <input type="text" id="address_2" />
        </div>
      </div>

      <div class="row">
        <div class="formGroup col-4">
          <label for="city">City</label>
          <input type="text" id="city" />
        </div>
        <div class="formGroup col-4">
          <label for="state">State</label>
          <input type="text" id="state" />
        </div>
        <div class="formGroup col-4">
          <label for="zip">Zip</label>
          <input type="number" id="zip" />
        </div>
      </div>

      <div class="row">
        <div class="formGroup col-4">
          <label for="primary_color">Primary Color</label>
          <input type="text" id="primary_color" />
        </div>
        <div class="formGroup col-4 offset-4">
          <label for="secondary_color">Secondary Color</label>
          <input type="text" id="secondary_color" />
        </div>
      </div>

      <div class="row">
        <div class="formGroup col-5">
          <label for="color_logo">Color Logo</label>
          <input type="file" id="color_logo" />
        </div>
        <div class="formGroup col-5 offset-2">
          <label for="grayscale_logo">Grayscale Logo</label>
          <input type="file" id="grayscale_logo" />
        </div>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2:after {
  content: '';
  display: block;
  height: 40px;
  width: 100%;
  border-top: 1.5px solid #B42625;
  border-right: 2px solid #B42625;
  border-left: 2px solid transparent;
  position: relative;
  -webkit-transform: skewX(-45deg);
  transform: skewX(-45deg);
  left: -23px;
  margin-top: .6rem;
}
</style>
