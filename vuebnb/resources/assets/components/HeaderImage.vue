<template>
    <div class="header">
        <div class="header-img" @click="$emit('header-clicked')" :style="headerImageStyle">
            <button class="view-photos">View Photos</button>
        </div>
        <listing-save :id="id" :button="true"></listing-save>    
        <button class="view-photos">View Photos</button>
    </div>
</template>
<script>
import ListingSave from '../components/ListingSave';
export default {
    computed: {
            headerImageStyle() { 
                return { 'background-image': 'url(' + this.imageUrl + ')'  }
            }
    },
    props: ['image-url', 'id'],
    components: { ListingSave }
}
</script>
<style>
.header {
  height: 320px;
  position: relative;
}
.header .header-img {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  background-color: #f5f5f5;
  height: 100%;
  cursor: pointer;
  position: relative;
}
.header .header-img button { 
    font-size: 14px; 
    padding: 7px 18px; 
    color:#484848; 
    line-height: 1.43; 
    background: #ffffff; 
    font-weight: bold; 
    border-radius: 4px; 
    border: 1px solid #c4c4c4; 
}

.header .header-img button.view-photos {
  position: absolute;
  bottom: 20px;
  left: 20px;
}
</style>