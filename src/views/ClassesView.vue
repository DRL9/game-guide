<script setup lang="ts">
import type { Classes } from '@prisma/client'
import { filterHandler } from '@/utils/tableColumnFilter'
import { useFetchCached } from '@/compositions/fetch'
import { computed } from 'vue'
const { data } = useFetchCached<Classes[]>('/game_data/classes.json')

const list = computed(() =>
  data.value
    ? data.value.map((item: Classes) => ({
        ...item,
        sumMax:
          item.hpMax +
          item.powerMax +
          item.magicMax +
          item.skillMax +
          item.speedMax +
          item.luckMax +
          item.resistanceMax +
          item.defenseMax +
          item.constitutionMax
      }))
    : []
)
const levelFilters = [
  { value: '基础', text: '基础' },
  { value: '高级', text: '高级' }
]
</script>

<template>
  <main>
    <h1>职业数据</h1>
    <el-table :data="list" max-height="90vh" v-loading="list.length === 0">
      <el-table-column prop="order" label="序号" sortable />
      <el-table-column prop="name" label="名称" sortable fixed />
      <el-table-column
        prop="level"
        label="级别"
        :filters="levelFilters"
        :filter-method="filterHandler"
      />
      <el-table-column prop="weapon" label="武器" />
      <el-table-column prop="specialSkill" label="特技" width="110px" />
      <el-table-column prop="skillDesc" label="技能描述" width="300px" />
      <el-table-column prop="combatType" label="战斗类型" />
      <el-table-column prop="combatDesc" label="战斗类型描述" width="200px" />
      <el-table-column prop="remark" label="备注" width="200px" />
      <el-table-column prop="hpMax" label="hp" sortable />
      <el-table-column prop="powerMax" label="力量" sortable />
      <el-table-column prop="magicMax" label="魔力" sortable />
      <el-table-column prop="skillMax" label="技巧" sortable />
      <el-table-column prop="speedMax" label="速度" sortable />
      <el-table-column prop="luckMax" label="幸运" sortable />
      <el-table-column prop="resistanceMax" label="魔防" sortable />
      <el-table-column prop="defenseMax" label="物防" sortable />
      <el-table-column prop="constitutionMax" label="体格" sortable />
      <el-table-column prop="sumMax" label="总和" sortable />
    </el-table>
  </main>
</template>
