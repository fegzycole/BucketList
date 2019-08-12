import express from 'express';
import auth from '../middlewares/authentication/auth';
import {
  createBucketList,
  getAllBucketLists,
  getABucketList,
  updateBucketList,
  deleteBucketList,
  PaginateBucketLists,
} from '../controllers/bucketlist';
import {
  validateBucketList,
  validateBucketListParam,
  validateupdateBucketList,
} from '../middlewares/validations/bucketlist';

import {
  validateBucketListItem,
  validateBucketListItemParam,
  validateBucketListParams,
} from '../middlewares/validations/bucketlistitem';
import {
  createBucketListItem,
  getAllBucketListItems,
  getABucketListItem,
  updateBucketListItem,
  deleteBucketListItem,
} from '../controllers/bucketlistitem';

const router = express.Router();

router.post('/', auth, validateBucketList, createBucketList);
router.get('/', auth, getAllBucketLists);
router.get('/', PaginateBucketLists);
router.get('/:id', auth, validateBucketListParam, getABucketList);
router.put('/:id', auth, validateBucketListParam, validateupdateBucketList, updateBucketList);
router.delete('/:id', auth, validateBucketListParam, deleteBucketList);
router.post('/:id/items', auth, validateBucketListItem, createBucketListItem);
router.get('/:id/items', auth, validateBucketListItemParam, getAllBucketListItems);
router.get('/:id/items/:itemId', auth, validateBucketListParams, getABucketListItem);
router.put('/:id/items/:itemId', auth, validateBucketListParams, updateBucketListItem);
router.delete('/:id/items/:itemId', auth, validateBucketListParams, deleteBucketListItem);

export default router;
