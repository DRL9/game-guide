export function filterHandler(value: string, row: any, column: any) {
  const property = column['property']
  return row[property] === value
}
