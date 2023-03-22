<script setup lang="ts">
import type { EmblemImbue } from '@prisma/client'
import { useFetch } from '@/compositions/fetch'

const { data: list } = useFetch<EmblemImbue[]>('/game_data/emblemImbue.json')
</script>

<template>
  <main>
    <h1>纹章士刻印</h1>
    <el-table :data="list || []" max-height="90vh">
      <el-table-column prop="order" label="序号" sortable />
      <el-table-column prop="emblem" label="纹章士" sortable />
      <el-table-column prop="imbue" label="刻印" sortable fixed />
      <el-table-column prop="damage" label="威力" sortable />
      <el-table-column prop="weight" label="重量" sortable />
      <el-table-column prop="hit" label="命中" sortable />
      <el-table-column prop="crit" label="必杀" sortable />
      <el-table-column prop="avoid" label="回避" sortable />
      <el-table-column prop="ddg" label="必避" sortable />
    </el-table>
  </main>
</template>

<style>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
