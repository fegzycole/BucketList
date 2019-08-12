import _ from 'lodash';
import model from '../models';
import {
  errorResponse,
  successResponse,
} from '../helpers/util';

export const createBucketListItem = async (req, res) => {
  try {
    const bucketList = await model.BucketList.findByPk(req.params.id);
    if (!bucketList) {
      return errorResponse(new Error('No bucketlist with the stated id'), res, 404);
    }
    const newBucketListItem = await model.BucketListItem.create({
      name: req.body.name,
      bucketListId: req.params.id,
    });
    const bucketListItem = _.pick(newBucketListItem, ['id', 'name', 'date_created', 'date_modified', 'created_by', 'done']);
    return successResponse(res, 201, bucketListItem);
  } catch (error) {
    return errorResponse(error, res, 500);
  }
};


export const getAllBucketListItems = async (req, res) => {
  try {
    const bucketList = await model.BucketList.findByPk(req.params.id);
    if (!bucketList) {
      return errorResponse(new Error('No bucketlist with the stated id'), res, 404);
    }
    const bucketLists = await model.BucketListItem.findAll({
      where: {
        bucketListId: req.params.id,
      },
    });
    return successResponse(res, 200, bucketLists);
  } catch (error) {
    return errorResponse(error, res, 500);
  }
};


export const getABucketListItem = async (req, res) => {
  try {
    const bucketList = await model.BucketList.findByPk(req.params.id);
    if (!bucketList) {
      return errorResponse(new Error('No bucketlist with the stated id'), res, 404);
    }
    const bucketListItem = await model.BucketListItem.findByPk(req.params.itemId);
    if (!bucketListItem) {
      return errorResponse(new Error('No bucketlist item with the stated id'), res, 404);
    }
    return successResponse(res, 200, bucketListItem);
  } catch (error) {
    return errorResponse(error, res, 500);
  }
};


export const updateBucketListItem = async (req, res) => {
  try {
    const bucketList = await model.BucketList.findByPk(req.params.id);
    if (!bucketList) {
      return errorResponse(new Error('No bucketlist with the stated id'), res, 404);
    }
    const bucketListItem = await model.BucketListItem.findByPk(req.params.itemId);
    if (!bucketListItem) {
      return errorResponse(new Error('No bucketlist item with the stated id'), res, 404);
    }
    await bucketListItem.update({
      name: req.body.name,
      done: req.body.done,
    });

    return successResponse(res, 200, bucketListItem);
  } catch (error) {
    return errorResponse(error, res, 500);
  }
};


export const deleteBucketListItem = async (req, res) => {
  try {
    const bucketList = await model.BucketList.findByPk(req.params.id);
    if (!bucketList) {
      return errorResponse(new Error('No bucketlist with the stated id'), res, 404);
    }
    const bucketListItem = await model.BucketListItem.findByPk(req.params.itemId);
    if (!bucketListItem) {
      return errorResponse(new Error('No bucketlist item with the stated id'), res, 404);
    }
    await bucketListItem.destroy();
    return successResponse(res, 200, 'Bucket list successfully deleted');
  } catch (error) {
    return errorResponse(error, res, 500);
  }
};
