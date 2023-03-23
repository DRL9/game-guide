<template>
  <el-table-column v-bind="$attrs">
    <template #default="scope">
      <div :class="classGetter(scope.row[scope.column.property])">
        {{ scope.row[scope.column.property] }}
      </div>
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
// 根据column值确定 class
defineProps<{
  classGetter: (cellValue: any) => string
}>()
</script>
