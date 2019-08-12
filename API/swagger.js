export default {
  swagger: '2.0',
  info: {
    description: 'API Documentation for My BucketList Application',
    version: '1.0.0',
    title: 'BucketList',
  },
  host: 'bucketlist-dev.herokuapp.com',
  basePath: '/api/v1',
  tags: [
    {
      name: 'Auth',
      description: 'Handles User login and logout',
    },
    {
      name: 'BucketList',
      description: 'Handles Creation, Updating, Deleting and Getting Of Bucket lists and bucket list items',
    },
  ],
  schemes: ['https'],
  paths: {
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Signs in a user if he already has an account or creates a new user if he hasn\'t been created',
        description: '',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'body',
            required: true,
            schema: {
              $ref: '#definitions/Login',
            },
          },
        ],
        responses: {
          201: {
            description: 'successful creation of a new user',
            schema: {
              $ref: '#definitions/CreateNewUserSuccessResponse',
            },
          },
          200: {
            description: 'Successfully logs in an already created user',
            schema: {
              $ref: '#definitions/LoginUserSuccessResponse',
            },
          },
          400: {
            description: 'Missing/Invalid request parameter',
            schema: {
              $ref: '#definitions/InvalidRequestResponse',
            },
          },
          500: {
            description: 'Server error response',
            schema: {
              $ref: '#definitions/ServerErrorResponse',
            },
          },
        },
      },
    },
    '/auth/logout': {
      get: {
        tags: ['Auth'],
        summary: 'Ends session and logs out a user',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'header',
            name: 'x-access-token',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#definitions/LogoutSuccessResponse',
            },
          },
          500: {
            description: 'Server error response',
            schema: {
              $ref: '#definitions/ServerErrorResponse',
            },
          },
          401: {
            description: 'Unauthorized user response',
            schema: {
              $ref: '#definitions/AuthenticationErrorResponse',
            },
          },
        },
      },
    },
    '/bucketlists': {
      get: {
        tags: ['BucketList'],
        summary: 'Fetch all bucket lists and their items',
        produces: ['application/json'],
        parameters: [
          {
            in: 'header',
            name: 'x-access-token',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#definitions/GetAllBucketListsResponse',
            },
          },
          500: {
            description: 'Server error response',
            schema: {
              $ref: '#definitions/ServerErrorResponse',
            },
          },
        },
      },
      post: {
        tags: ['BucketList'],
        summary: 'Create a new bucket list',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'header',
            name: 'x-access-token',
            required: true,
          },
          {
            in: 'body',
            name: 'body',
            description: 'body',
            required: true,
            schema: {
              $ref: '#definitions/BucketList',
            },
          },
        ],
        responses: {
          201: {
            description: 'successful operation',
            schema: {
              $ref: '#definitions/CreateBucketListSuccessResponse',
            },
          },
          400: {
            description: 'Misssing/Invalid Request Parameter',
            schema: {
              $ref: '#definitions/InvalidBucketListResponse',
            },
          },
          500: {
            description: 'Server error response',
            schema: {
              $ref: '#definitions/ServerErrorResponse',
            },
          },
        },
      },
    },
    '/bucketlists?page=pageNo&limit=noOfRecords': {
      get: {
        tags: ['BucketList'],
        summary: 'Fetch a particular number of bucket lists',
        produces: ['application/json'],
        parameters: [
          {
            in: 'header',
            name: 'x-access-token',
            required: true,
          },
          {
            name: 'page',
            in: 'query',
            description: 'current page number',
            required: true,
            type: 'integer',
            example: 0,
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Number of records to fetch',
            required: true,
            type: 'integer',
            example: 20,
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#definitions/GetAllBucketListsResponse',
            },
          },
          500: {
            description: 'Server error response',
            schema: {
              $ref: '#definitions/ServerErrorResponse',
            },
          },
        },
      },
    },
    '/bucketlists?q=bucketListName': {
      get: {
        tags: ['BucketList'],
        summary: 'Fetch all Properties of a specific name',
        produces: ['application/json'],
        parameters: [
          {
            in: 'header',
            name: 'x-access-token',
            required: true,
          },
          {
            name: 'q',
            in: 'query',
            description: 'name of specific bucket list',
            required: true,
            type: 'string',
            example: 'Go to the moon',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#definitions/GetAllBucketListsResponse',
            },
          },
          500: {
            description: 'Server error response',
            schema: {
              $ref: '#definitions/ServerErrorResponse',
            },
          },
        },
      },
    },
    '/bucketlists/{id}': {
      get: {
        tags: ['BucketList'],
        summary: 'Get a specific bucket list',
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
          },
          {
            in: 'header',
            name: 'x-access-token',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: '#definitions/GetABucketListResponse',
            },
          },
          404: {
            description: 'Bucket list not found',
            schema: {
              $ref: '#definitions/BucketListNotFoundErrorResponse',
            },
          },
          500: {
            description: 'Server error response',
            schema: {
              $ref: '#definitions/ServerErrorResponse',
            },
          },
        },
      },
      put: {
        tags: ['BucketList'],
        summary: 'Update the name of a bucket list',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
          },
          {
            in: 'header',
            name: 'x-access-token',
            required: true,
          },
          {
            name: 'name',
            in: 'body',
            description: 'New name of bucket list',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#definitions/GetABucketListResponse',
            },
          },
          400: {
            description: 'Misssing/Invalid Request Parameter',
            schema: {
              $ref: '#definitions/InvalidBucketListResponse',
            },
          },
          404: {
            description: 'Property Not Found',
            schema: {
              $ref: '#definitions/BucketListNotFoundErrorResponse',
            },
          },
          500: {
            description: 'Server error response',
            schema: {
              $ref: '#definitions/ServerErrorResponse',
            },
          },
        },
      },
      delete: {
        tags: ['BucketList'],
        summary: 'Delete a lbucket list',
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
          },
          {
            in: 'header',
            name: 'x-access-token',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: '#definitions/BucketListDeletedResponse',
            },
          },
          404: {
            description: 'Property Not Found',
            schema: {
              $ref: '#definitions/BucketListNotFoundErrorResponse',
            },
          },
          500: {
            description: 'Server error response',
            schema: {
              $ref: '#definitions/ServerErrorResponse',
            },
          },
        },
      },
    },
    '/bucketlists/{id}/item': {
      get: {
        tags: ['BucketList'],
        summary: 'Get all items in a bucket list',
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
          },
          {
            in: 'header',
            name: 'x-access-token',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#definitions/BucketListItemsSuccessResponse',
            },
          },
          404: {
            description: 'Bucket list not found',
            schema: {
              $ref: '#definitions/BucketListNotFoundErrorResponse',
            },
          },
          500: {
            description: 'Server error response',
            schema: {
              $ref: '#definitions/ServerErrorResponse',
            },
          },
        },
      },
      post: {
        tags: ['BucketList'],
        summary: 'Create a new bucket list item',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'header',
            name: 'x-access-token',
            required: true,
          },
          {
            in: 'body',
            name: 'body',
            description: 'body',
            required: true,
            schema: {
              $ref: '#definitions/BucketListItem',
            },
          },
        ],
        responses: {
          201: {
            description: 'successful operation',
            schema: {
              $ref: '#definitions/BucketListItemSuccessResponse',
            },
          },
          400: {
            description: 'Misssing/Invalid Request Parameter',
            schema: {
              $ref: '#definitions/InvalidBucketListResponse',
            },
          },
          404: {
            description: 'Bucket list not found',
            schema: {
              $ref: '#definitions/BucketListNotFoundErrorResponse',
            },
          },
          500: {
            description: 'Server error response',
            schema: {
              $ref: '#definitions/ServerErrorResponse',
            },
          },
        },
      },
    },
    '/bucketlists/{id}/item/{itemId}': {
      get: {
        tags: ['BucketList'],
        summary: 'Get an item in a bucket list',
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
          },
          {
            in: 'path',
            name: 'itemId',
            required: true,
          },
          {
            in: 'header',
            name: 'x-access-token',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#definitions/BucketListItemsSuccessResponse',
            },
          },
          404: {
            description: 'Bucket list not found',
            schema: {
              $ref: '#definitions/BucketListNotFoundErrorResponse',
            },
          },
          500: {
            description: 'Server error response',
            schema: {
              $ref: '#definitions/ServerErrorResponse',
            },
          },
        },
      },
      put: {
        tags: ['BucketList'],
        summary: 'Update the details of a bucket list',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
          },
          {
            in: 'path',
            name: 'itemId',
            required: true,
          },
          {
            in: 'header',
            name: 'x-access-token',
            required: true,
          },
          {
            name: 'name',
            in: 'body',
            description: 'New name of bucket list item',
            required: false,
            type: 'string',
          },
          {
            name: 'done',
            in: 'body',
            description: 'New status of bucket list item',
            required: false,
            type: 'boolean',
          },
        ],
        responses: {
          200: {
            description: 'successful operation',
            schema: {
              $ref: '#definitions/BucketListItemsSuccessResponse',
            },
          },
          400: {
            description: 'Misssing/Invalid Request Parameter',
            schema: {
              $ref: '#definitions/InvalidBucketListUpdateResponse',
            },
          },
          404: {
            description: 'Bucket list item not found',
            schema: {
              $ref: '#definitions/BucketListNotFoundErrorResponse',
            },
          },
          500: {
            description: 'Server error response',
            schema: {
              $ref: '#definitions/ServerErrorResponse',
            },
          },
        },
      },
      delete: {
        tags: ['BucketList'],
        summary: 'Delete a bucket list item',
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
          },
          {
            in: 'header',
            name: 'x-access-token',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: '#definitions/BucketListDeletedResponse',
            },
          },
          404: {
            description: 'Property Not Found',
            schema: {
              $ref: '#definitions/BucketListNotFoundErrorResponse',
            },
          },
          500: {
            description: 'Server error response',
            schema: {
              $ref: '#definitions/ServerErrorResponse',
            },
          },
        },
      },
    },
  },
  definitions: {
    Login: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'fergusoniyara@gmail.com',
        },
        password: {
          type: 'string',
          example: 'fegzycole1211@',
        },
      },
    },
    BucketList: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Travel the world',
        },
      },
    },
    BucketListItem: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Get ticket',
        },
      },
    },
    CreateNewUserSuccessResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          example: 201,
        },
        data: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImZlcmd1c29uaXlhcmFAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiT2doZW5lZmVnb3IiLCJsYXN0TmFtZSI6Ikl5YXJhIiwicGFzc3dvcmQiOiJzb21lcGFzc3dvcmQiLCJwaG9uZU51bWJlciI6IjA3MDU3MTU0NDY3IiwiYWRkcmVzcyI6IjEwMDQgSG91c2luZyBFc3RhdGVzLCBWaWN0b3JpYS1Jc2xhbmQsIExhZ29zIFN0YXRlIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MjMyOTQzOCwiZXhwIjoxNTYyNDE1ODM4fQ.RYXzXtx6yM2RqGpzF8EL1RO3QwKGc1FqT5QD5wh4SsY',
            },
            id: {
              type: 'integer',
              example: 20,
            },
            email: {
              type: 'string',
              example: 'fergusoniyara@gmail.com',
            },
            createdAt: {
              type: 'string',
              example: '2019-08-12T15:22:51.348',
            },
            updatedAt: {
              type: 'string',
              example: '2019-08-12T15:22:51.348',
            },
          },
        },
      },
    },
    LoginUserSuccessResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          example: 200,
        },
        data: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImZlcmd1c29uaXlhcmFAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiT2doZW5lZmVnb3IiLCJsYXN0TmFtZSI6Ikl5YXJhIiwicGFzc3dvcmQiOiJzb21lcGFzc3dvcmQiLCJwaG9uZU51bWJlciI6IjA3MDU3MTU0NDY3IiwiYWRkcmVzcyI6IjEwMDQgSG91c2luZyBFc3RhdGVzLCBWaWN0b3JpYS1Jc2xhbmQsIExhZ29zIFN0YXRlIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU2MjMyOTQzOCwiZXhwIjoxNTYyNDE1ODM4fQ.RYXzXtx6yM2RqGpzF8EL1RO3QwKGc1FqT5QD5wh4SsY',
            },
            id: {
              type: 'integer',
              example: 20,
            },
            email: {
              type: 'string',
              example: 'fergusoniyara@gmail.com',
            },
            createdAt: {
              type: 'string',
              example: '2019-08-12T15:22:51.348',
            },
            updatedAt: {
              type: 'string',
              example: '2019-08-12T15:22:51.348',
            },
          },
        },
      },
    },
    InvalidRequestResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          example: 400,
        },
        error: {
          type: 'object',
          properties: {
            email: {
              type: 'array',
              example: ['email cannot be empty'],
            },
            password: {
              type: 'array',
              example: ['password cannot be empty'],
            },
          },
        },
      },
    },
    InvalidBucketListResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          example: 400,
        },
        error: {
          type: 'object',
          properties: {
            name: {
              type: 'array',
              example: ['name cannot be empty'],
            },
          },
        },
      },
    },
    LogoutSuccessResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 200,
        },
        message: {
          type: 'string',
          example: 'Welcome To My Bucket List',
        },
      },
    },
    AuthenticationErrorResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          example: 401,
        },
        error: {
          type: 'string',
          example: 'You do not have access to this resource',
        },
      },
    },
    ServerErrorResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          example: 500,
        },
        error: {
          type: 'string',
          example: 'Internal server error',
        },
      },
    },
    GetAllBucketListsResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          example: 200,
        },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                example: 22,
              },
              name: {
                type: 'string',
                example: 'Travel the world',
              },
              date_created: {
                type: 'string',
                example: '2019-08-11T20:06:50.496Z',
              },
              date_modified: {
                type: 'string',
                example: '2019-08-11T20:06:50.496Z',
              },
              created_by: {
                type: 'integer',
                example: 1,
              },
              Items: {
                type: 'array',
                items: {
                  properties: {
                    id: {
                      type: 'integer',
                      example: 22,
                    },
                    name: {
                      type: 'string',
                      example: 'Travel the world',
                    },
                    date_created: {
                      type: 'string',
                      example: '2019-08-11T20:06:50.496Z',
                    },
                    date_modified: {
                      type: 'string',
                      example: '2019-08-11T20:06:50.496Z',
                    },
                    bucketListId: {
                      type: 'integer',
                      example: 3,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    GetABucketListResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          example: 200,
        },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 22,
            },
            name: {
              type: 'string',
              example: 'Travel the world',
            },
            date_created: {
              type: 'string',
              example: '2019-08-11T20:06:50.496Z',
            },
            date_modified: {
              type: 'string',
              example: '2019-08-11T20:06:50.496Z',
            },
            created_by: {
              type: 'integer',
              example: 1,
            },
            Items: {
              type: 'array',
              items: {
                properties: {
                  id: {
                    type: 'integer',
                    example: 22,
                  },
                  name: {
                    type: 'string',
                    example: 'Travel the world',
                  },
                  date_created: {
                    type: 'string',
                    example: '2019-08-11T20:06:50.496Z',
                  },
                  date_modified: {
                    type: 'string',
                    example: '2019-08-11T20:06:50.496Z',
                  },
                  bucketListId: {
                    type: 'integer',
                    example: 3,
                  },
                },
              },
            },
          },
        },
      },
    },
    GetASoldPropertySuccessResponse: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          example: 22,
        },
        status: {
          type: 'string',
          example: 'Sold',
        },
        type: {
          type: 'string',
          example: '2 Bedroom',
        },
        state: {
          type: 'string',
          example: 'Lagos State',
        },
        city: {
          type: 'string',
          example: 'Ikoyi',
        },
        address: {
          type: 'string',
          example: 'No 54 Bourdillon drive, Ikoyi',
        },
        price: {
          type: 'decimal',
          example: 6500000.65,
        },
        created_on: {
          type: 'string',
          format: 'date-time',
        },
        image_url: {
          type: 'string',
          example: 'https://res.cloudinary.com/propertypro/image/upload/v1561326667/iiyxnceemy20eeincxiof.jpg',
        },
        owner_email: {
          type: 'string',
          example: 'fergusoniyara@gmail.com',
        },
        owner_phone_number: {
          type: 'string',
          example: '07057154467',
        },
      },
    },
    CreateBucketListSuccessResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          example: 201,
        },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 2,
            },
            name: {
              type: 'string',
              example: 'Go to the moon',
            },
            date_created: {
              type: 'string',
              example: '2019-08-12T15:22:51.348',
            },
            date_modified: {
              type: 'string',
              example: '2019-08-12T15:22:51.348',
            },
            created_by: {
              type: 'integer',
              example: 2,
            },
          },
        },
      },
    },
    UserNotLoggedInErrorResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'error',
        },
        error: {
          type: 'string',
          example: 'You do not have access to this resource',
        },
      },
    },
    BucketListNotFoundErrorResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          example: 404,
        },
        error: {
          type: 'string',
          example: 'No bucketlist with the stated id',
        },
      },
    },
    BucketListDeletedResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          example: 200,
        },
        data: {
          type: 'string',
          example: 'Bucket list successfully deleted',
        },
      },
    },
    BucketListItemSuccessResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          example: 201,
        },
        data: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 21,
            },
            name: {
              type: 'string',
              example: 'Travel the world',
            },
            date_created: {
              type: 'string',
              example: '2019-08-11T20:06:50.496Z',
            },
            date_modified: {
              type: 'string',
              example: '2019-08-11T20:06:50.496Z',
            },
            bucketListId: {
              type: 'integer',
              example: 1,
            },
          },
        },
      },
    },
    BucketListItemsSuccessResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          example: 201,
        },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                example: 21,
              },
              name: {
                type: 'string',
                example: 'Travel the world',
              },
              date_created: {
                type: 'string',
                example: '2019-08-11T20:06:50.496Z',
              },
              date_modified: {
                type: 'string',
                example: '2019-08-11T20:06:50.496Z',
              },
              bucketListId: {
                type: 'integer',
                example: 1,
              },
            },
          },
        },
      },
    },
    InvalidBucketListUpdateResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          example: 400,
        },
        error: {
          type: 'object',
          properties: {
            name: {
              type: 'array',
              example: ['name must be a string'],
            },
            done: {
              type: 'array',
              example: ['done must be a boolean'],
            },
          },
        },
      },
    },
  },
};
