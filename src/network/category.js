import {request} from './request'

export function getCategoryList () {
  return request({
    url: '/category'
  })
}

export function getCategorySort (maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategories (miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}