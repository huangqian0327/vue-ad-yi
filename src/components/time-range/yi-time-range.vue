<template>
  <div class="time-range">
    <el-time-picker
      v-model="startTime"
      :picker-options="{
        selectableRange: timeRange
      }"
      placeholder="开始时间">
    </el-time-picker>
    <el-time-picker
      v-model="stopTime"
      :picker-options="{
        selectableRange: timeRange
      }"
      placeholder="结束时间">
    </el-time-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        startTime: '',
        stopTime: '',
        timeRange: '18:30:00 - 20:30:00'
      }
    }
  }
</script>

<style>
  
</style>