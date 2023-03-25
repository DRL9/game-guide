<template>
  <div>
    <h1>element-plus select</h1>
    <el-select v-model="selected[currentProp]">
      <el-option v-for="item in list" :key="item.value" :value="item.value">{{
        item.value
      }}</el-option>
    </el-select>
  </div>
  <div>
    <h1>element-plus tree-select</h1>
    <el-tree-select v-model="selected[currentProp]" :data="list2" />
  </div>
  <div>
    <h1>select</h1>
    <select v-model="selected[currentProp]">
      <option v-for="item in list" :key="item.value" :value="item.value">{{ item.value }}</option>
    </select>
  </div>
  <div>
    currentProp:
    <select v-model="currentProp">
      <option>a</option>
      <option>b</option>
    </select>
  </div>
  <div>
    <p>a: {{ selected.a }}</p>
    <p>b: {{ selected.b }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<{ [index: string]: string }>({
  a: '1',
  b: '2'
})
const currentProp = ref<string>('a')

const list = [
  { value: 1, label: 1 },
  { value: 2, label: 2 }
]
const list2 = [{ label: 'l1', value: 'l1', children: list }]
</script>
