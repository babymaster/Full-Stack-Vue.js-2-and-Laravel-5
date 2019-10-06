<template>
    <div>
        <p v-bind:class="{contracted: isContracted}"><slot></slot></p>
        <button class="more" v-if="isContracted" @click="isContracted=false">+ More</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isContracted: true
        }
    }
}
</script>
<style>
.about button.more {
  background: transparent;
  border: 0;
  color: #008489;
  padding: 0;
  font-size: 17px;
  font-weight: bold;
}

.about button.more:hover,
.about button.more:focus,
.about button.more:active {
  text-decoration: underline;
  outline: none;
}
</style>