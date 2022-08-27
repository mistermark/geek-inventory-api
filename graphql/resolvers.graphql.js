import { AuthenticationError } from 'apollo-server';
import { Type, CollectionItem } from '../db/db.js';

const throwAuthError = (reject) => {
  throw new AuthenticationError("Not logged in!");
  if(reject) reject();
}

const _createCollectionItem = (parent, { data }, { auth }) => {
  return new Promise((resolve, reject) => {
    if(!auth.isAuthenticated) throwAuthError(reject);
    CollectionItem.create(data, (err, newItem) => {
      if (err) reject(err);
      else resolve({
        code: 200,
        message: "success",
        data: newItem
      });
    });
  })
}

const _updateCollectionItem = (parent, args, {auth}, info) => {
  return new Promise((resolve, reject) => {
    if(!auth.isAuthenticated) throwAuthError(reject);
    CollectionItem.findByIdAndUpdate(args.data._id, args.data, (err, updatedItem) => {
      if (err) reject(err);
      else resolve({
        code: 200,
        message: "success",
        data: updatedItem
      });
    });
  })
}

export const resolvers = {
  Query: {
    types: (parent, args, {auth}) => {
      return new Promise((resolve, reject) => {
        if(!auth.isAuthenticated) throwAuthError(reject);
        Type.find((err, types) => {
          if(err) reject(err)
          else resolve(types);
        })
      })
    },
    item: (parent, args, {auth}) => {
      return new Promise((resolve, reject) => {
        if(!auth.isAuthenticated) throwAuthError(reject);
        CollectionItem.findById(args.id, (err, item) => {
          if (err) reject(err)
          else resolve(item);
        })
      })
    },
    collectionItems: (parent, args, {auth}) => {
      return new Promise((resolve, reject) => {
        if(!auth.isAuthenticated) throwAuthError(reject);
        CollectionItem.find((err, collectionItems) => {
          const returnVal = collectionItems.map((item) => {
              return {
                ...item._doc,
                _id: item.id,
              };
            })
          if (err) reject(err)
          else resolve(returnVal);
        })
      })
    },
    collectionItemsByType: (parent, args, {auth}, info) => {
      const { type } = args;
      return new Promise((resolve, reject) => {
        if(!auth.isAuthenticated) throwAuthError(reject);
        CollectionItem.find((type ? {type} : {}), (err, collectionItems) => {
          const returnVal = collectionItems.map((item) => {
              return {
                ...item._doc,
                _id: item.id,
              };
            })
          if (err) reject(err)
          else resolve(returnVal);
        })
      })
    },
  },
  Mutation: {
    createCollectionItemLego: _createCollectionItem,
    createCollectionItemVideoGame: _createCollectionItem,
    updateCollectionItemLego: _updateCollectionItem,
    updateCollectionItemVideoGame: _updateCollectionItem,
    deleteCollectionItem: (parent, args, {auth}, info) => {
      return new Promise((resolve, reject) => {
        if(!auth.isAuthenticated) throwAuthError(reject);
        CollectionItem.findByIdAndDelete(args.id, (err) => {
          if(err) reject(err)
          else resolve({
              code: 200,
              message: "success"
            })
        })
      })
    }
  }
};
