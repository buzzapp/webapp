<script>
  export default {
    name: "Panel",

    props: ['title']
  }
</script>

<template>
  <div class="panel">
    <div class="panel-heading">
      <h1 class="panel-title">{{title}}</h1>
    </div>
    <div class="panel-body">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="sass">
  // Imports
  @import "../variables.scss";

  // Styles
  .panel{
    margin-bottom: 22px;
    background-color: $white;
    border: 1px solid transparent;
    border-radius:4px;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
    position: relative;
    margin-bottom: 30px;
    border-width: 0;

    .panel-heading{
      position: relative;
      padding: 0;
      border-bottom: 1px solid transparent;
      padding: 0;
      border-bottom: 1px solid transparent;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      border-bottom: solid 1px #eee;
    }
    .panel-title{
      display: block;
      padding: 20px 30px;
      font-size: 18px;
      color: #37474f;
      margin-top: 0;
      margin-bottom: 0;
      font-size: 16px;
      color: inherit;
    }
    .panel-body{
      height: 100%;
      padding: 20px;
    }
  }
</style>
