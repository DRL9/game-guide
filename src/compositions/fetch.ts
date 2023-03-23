import { ref, unref, watch } from 'vue'

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const error = ref(null)
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      data.value = json
    })
    .catch((err) => {
      error.value = err
    })

  return {
    data,
    error
  }
}

const respCached = new Map()
export function useFetchCached<T>(url: string) {
  const cached = respCached.get(url)
  const error = ref(null)
  const data = ref<T | null>(cached || null)
  if (!cached) {
    const { data: d, error: e } = useFetch<T>(url)
    watch(d, () => {
      data.value = d.value
      respCached.set(url, unref(d))
    })
    watch(e, () => {
      error.value = e.value
    })
  }
  return {
    data,
    error
  }
}
