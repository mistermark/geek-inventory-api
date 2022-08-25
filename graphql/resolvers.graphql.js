import { Type, CollectionItem } from '../db/db.js';

const _createCollectionItem = (parent, args, context, info) => {
  return new Promise((resolve, reject) => {
    CollectionItem.create(args.data, (err, newItem) => {
      if (err) reject(err);
      else resolve({
        code: 200,
        message: "success",
        data: newItem
      });
    });
  })
}

const _updateCollectionItem = (parent, args, context, info) => {
  return new Promise((resolve, reject) => {
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
    types: () => {
      return new Promise((resolve, reject) => {
        Type.find((err, types) => {
          if(err) reject(err)
          else resolve(types);
        })
      })
    },
    item: (parent, args) => {
      return new Promise((resolve, reject) => {
        CollectionItem.findById(args.id, (err, item) => {
          if (err) reject(err)
          else resolve(item);
        })
      })
    },
    collectionItems: () => {
      return new Promise((resolve, reject) => {
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
    collectionItemsByType: (parent, args, context, info) => {
      const { type } = args;
      return new Promise((resolve, reject) => {
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
    deleteCollectionItem: (parent, args, context, info) => {
      return new Promise((resolve, reject) => {
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
