/**
 * 返回列高对象中的最小高度所在的列
 */
export const getMinHeightColumn = (columnHeightObj: any) => {
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHeight
  }) as string
}

/**
 * 返回列高对象中的最小的高度
 */
export const getMinHeight = (columnHeightObj: Record<string, number>) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}

/**
 * 返回列高对象中的最大的高度
 */
export const getMaxHeight = (columnHeightObj: Record<string, number>) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}
