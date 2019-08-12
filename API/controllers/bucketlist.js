/* eslint-disable no-param-reassign */
import _ from 'lodash';
import model from '../models';
import {
  errorResponse,
  successResponse,
} from '../helpers/util';


export const createBucketList = async (req, res) => {
  try {
    const newBucketList = await model.BucketList.create({
      name: req.body.name,
      created_by: req.decoded.user.id,
    });
    const bucketList = _.pick(newBucketList, ['id', 'name', 'date_created', 'date_modified', 'created_by']);
    return successResponse(res, 201, bucketList);
  } catch (error) {
    return errorResponse(error, res, 500);
  }
};


export const getAllBucketLists = async (req, res, next) => {
  const { page, limit, q } = req.query;
  if ((page && limit) || q) {
    return next();
  }
  try {
    const bucketLists = await model.BucketList.findAll({
      include: {
        model: model.BucketListItem,
        as: 'Items',
      },
    });
    return successResponse(res, 200, bucketLists);
  } catch (error) {
    return errorResponse(error, res, 500);
  }
};


export const PaginateBucketLists = async (req, res) => {
  const { page, limit, q } = req.query;
  const offset = page * limit;
  const pageLimit = offset + limit;
  try {
    if (page && limit) {
      const bucketLists = await model.BucketList.findAndCountAll({
        include: {
          model: model.BucketListItem,
          as: 'Items',
        },
        limit: pageLimit,
        offset,
      });
      return successResponse(res, 200, bucketLists);
    }
    const bucketList = await model.BucketList.findAll({
      where: {
        name: q,
      },
      include: {
        model: model.BucketListItem,
        as: 'Items',
      },
    });
    if (bucketList.length < 1) {
      return errorResponse(new Error('No bucketlist with the stated name'), res, 404);
    }
    return successResponse(res, 200, bucketList);
  } catch (error) {
    return errorResponse(error, res, 500);
  }
};


export const getABucketList = async (req, res) => {
  try {
    const bucketList = await model.BucketList.findAll({
      where: {
        id: req.params.id,
      },
      include: {
        model: model.BucketListItem,
        as: 'Items',
      },
    });
    if (bucketList.length < 1) {
      return errorResponse(new Error('No bucketlist with the stated id'), res, 404);
    }
    return successResponse(res, 200, bucketList[0]);
  } catch (error) {
    return errorResponse(error, res, 500);
  }
};


export const updateBucketList = async (req, res) => {
  try {
    const bucketList = await model.BucketList.findAll({
      where: {
        id: req.params.id,
      },
      include: {
        model: model.BucketListItem,
        as: 'Items',
      },
    });
    if (bucketList.length < 1) {
      return errorResponse(new Error('No bucketlist with the stated id'), res, 404);
    }
    await bucketList[0].update({
      name: req.body.name,
    });
    return successResponse(res, 200, bucketList[0]);
  } catch (error) {
    return errorResponse(error, res, 500);
  }
};


export const deleteBucketList = async (req, res) => {
  try {
    const bucketList = await model.BucketList.findByPk(req.params.id);
    if (!bucketList) {
      return errorResponse(new Error('No bucketlist with the stated id'), res, 404);
    }
    await bucketList.destroy();
    return successResponse(res, 200, 'Bucket list successfully deleted');
  } catch (error) {
    return errorResponse(error, res, 500);
  }
};
