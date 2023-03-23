<script setup lang="ts">
import type { Weapon, EmblemImbue } from '@prisma/client'
import { useFetchCached } from '@/compositions/fetch'
import { computed, watchEffect } from 'vue'
import { useLocalStorage } from '@/compositions/localStorage'

import TableColumnClassName from '@/components/TableColumnClassName.vue'

const { data: emblemImbueList } = useFetchCached<EmblemImbue[]>('/game_data/emblemImbue.json')
const { data: weaponList } = useFetchCached<Weapon[]>('/game_data/weapon.json')
const weaponOpts = computed(() => {
  if (!weaponList.value || weaponList.value.length === 0) {
    return []
  }
  const grouped = weaponList.value
    .filter((row) => row.type === 'equip' && row.kind !== '杖')
    .reduce((acc, row) => {
      let weapons: Set<string> = acc.get(row.kind)
      if (!weapons) {
        acc.set(row.kind, (weapons = new Set()))
      }
      weapons.add(row.name)
      return acc
    }, new Map())
  return Array.from(grouped).map(([kind, names]) => ({
    value: kind,
    label: kind,
    children: Array.from(names).map((a) => ({ value: a, label: a }))
  }))
})
type ImbueWeapon = {
  [index: string]: string
}

const KEY_STORAGE = 'ff_engage_imbue_weapon'
const selected = useLocalStorage<ImbueWeapon>(KEY_STORAGE)
watchEffect(() => {
  localStorage.setItem(KEY_STORAGE, JSON.stringify(selected.value))
})
function onClearConfig() {
  selected.value = {}
}
const loading = computed(() => weaponOpts.value.length === 0 || !emblemImbueList.value)

function classGetter(isPositiveBetter: boolean) {
  return (a: number) => (a === 0 ? '' : (isPositiveBetter ? a > 0 : a <= 0) ? 'good' : 'bad')
}
const posiGetter = classGetter(true)
const negGetter = classGetter(false)
</script>

<template>
  <main class="page">
    <h1>纹章士刻印</h1>
    <div>
      <el-button @click="onClearConfig">清除配置</el-button>
    </div>
    <el-table :data="emblemImbueList || []" max-height="90vh" v-loading="loading">
      <el-table-column prop="order" label="序号" sortable />
      <el-table-column prop="emblem" label="纹章士" sortable />
      <el-table-column prop="imbue" label="刻印" sortable fixed />
      <table-column-class-name
        align="center"
        :class-getter="posiGetter"
        prop="might"
        label="威力"
        sortable
      />
      <table-column-class-name
        align="center"
        :class-getter="negGetter"
        prop="weight"
        label="重量"
        sortable
      />
      <table-column-class-name
        align="center"
        :class-getter="posiGetter"
        prop="hit"
        label="命中"
        sortable
      />
      <table-column-class-name
        align="center"
        :class-getter="posiGetter"
        prop="crit"
        label="必杀"
        sortable
      />
      <table-column-class-name
        align="center"
        :class-getter="posiGetter"
        prop="avoid"
        label="回避"
        sortable
      />
      <table-column-class-name
        align="center"
        :class-getter="posiGetter"
        prop="ddg"
        label="必避"
        sortable
      />
      <el-table-column label="武器" width="140px">
        <template #default="scope">
          <el-tree-select
            placeholder="选择武器"
            clearable
            v-model="selected[scope.row.imbue]"
            :data="weaponOpts"
            :render-after-expand="true"
          />
        </template>
      </el-table-column>
    </el-table>
  </main>
</template>

<style>
.bad {
  background-color: red;
  color: white;
}
.good {
  color: white;
  background-color: green;
}
</style>
