<script setup lang="ts">
import { useFetchCached } from '@/compositions/fetch'
import type { Weapon } from '@prisma/client'
import type { TableColumnCtx } from 'element-plus'
import { computed } from 'vue'

const { data: list } = useFetchCached<Weapon[]>('/game_data/weapon.json')

function filterFieldFactory(field: keyof Weapon) {
  return computed(() =>
    list.value
      ? Array.from(new Set(list.value.map((a) => a[field]))).map((type) => ({
          text: type as string,
          value: type as string
        }))
      : []
  )
}
const filterType = filterFieldFactory('type')
const filterKind = filterFieldFactory('kind')
const filterHandler = (value: string, row: any, column: TableColumnCtx<Weapon>) => {
  const property = column['property']
  return row[property] === value
}
</script>

<template>
  <main class="page">
    <h1>武器数据</h1>
    <el-table :data="list || []" max-height="90vh">
      <el-table-column prop="order" label="序号" sortable />
      <el-table-column prop="name" label="名称" sortable fixed />
      <el-table-column
        prop="kind"
        label="种类"
        :filters="filterKind"
        :filter-method="filterHandler"
      />
      <el-table-column
        prop="type"
        label="类型"
        :filters="filterType"
        :filter-method="filterHandler"
      />
      <el-table-column prop="price" label="价格" sortable />
      <el-table-column prop="might" label="威力" sortable />
      <el-table-column prop="weight" label="重量" sortable />
      <el-table-column prop="hit" label="命中" sortable />
      <el-table-column prop="crit" label="必杀" sortable />
      <el-table-column prop="avoid" label="回避" sortable />
      <el-table-column prop="ddg" label="必避" sortable />
    </el-table>
  </main>
</template>
