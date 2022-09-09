import { AuthenticationError } from 'apollo-server';
import { Type, Item, User } from '../db/db.js';

const throwAuthError = (reject) => {
  if(reject) reject();
  throw new AuthenticationError("Not logged in!");
}

const _createCollectionItem = (parent, { data }, { auth }) => {
  return new Promise((resolve, reject) => {
    if(!auth.isAuthenticated) throwAuthError(reject);
    Item.create(data, (err, newItem) => {
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
    Item.findByIdAndUpdate(args.data._id, args.data, (err, updatedItem) => {
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
        const { username } = args;
        User.findOne({username})
          .populate('items')
          .exec((err, user) => {
            try {
              const uniqTypes = [...new Set(user.items.map(item => item.type))];
              Type.find({type: uniqTypes}, (err, types) => {
                if(err) reject(err)
                else resolve(types.sort((a, b) => (a.name > b.name ? 1 : -1)));
              })
            } catch(e) {
              reject(e);
            }
          });
      })
    },
    item: (parent, args, {auth}) => {
      return new Promise((resolve, reject) => {
        if(!auth.isAuthenticated) throwAuthError(reject);
        Item.findById(args.id, (err, item) => {
          if (err) reject(err)
          else resolve(item);
        })
      })
    },
    collectionItems: (parent, args, {auth}) => {
      return new Promise((resolve, reject) => {
        if(!auth.isAuthenticated) throwAuthError(reject);
        Item.find((err, collectionItems) => {
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
    getInventory: (parent, args, {auth}) => {
      return new Promise((resolve, reject) => {
        try {
          if(!auth.isAuthenticated) throwAuthError(reject);
          const { username } = args;
          User.findOne({username}).populate('items').exec((err, user) => {
            if (err) reject(err);
            else resolve(user.items);
          });
        } catch(e) {
          reject(e);
        }
      });
    },
    itemsByType: (parent, args, {auth}) => {
      return new Promise((resolve, reject) => {
        try {
          if(!auth.isAuthenticated) throwAuthError(reject);
          const { type, username } = args;
          if(username) {
            User.findOne({username}).populate('items').exec((err, user) => {
              resolve(user.items.filter(item => item.type === type));
            });
          } else {
            Item.find({type}, (err, collectionItems) => {
              if (err) reject(err)
              else resolve(collectionItems);
            })
          }
        } catch(e) {
          reject(e);
        }
      })
    },
  },
  Mutation: {
    createCollectionItemLego: _createCollectionItem,
    createCollectionItemVideoGame: _createCollectionItem,
    updateCollectionItemLego: _updateCollectionItem,
    updateCollectionItemVideoGame: _updateCollectionItem,
    deleteItem: (parent, args, {auth}, info) => {
      return new Promise((resolve, reject) => {
        if(!auth.isAuthenticated) throwAuthError(reject);
        Item.findByIdAndDelete(args.id, (err) => {
          if(err) reject(err)
          else resolve({
              code: 204,
              message: "success"
            })
        })
      })
    },
    removeFromInventory: (parent, args, {auth}) => {
      return new Promise((resolve, reject) => {
        try {
          if(!auth.isAuthenticated) throwAuthError(reject);
          const {id, username} = args;
          User.updateOne({username}, { $pull: {items: id}}, (err, result) => {
            if(err) reject(err);
            if(result && result.modifiedCount === 0) {
              resolve({
                code: 204,
                message: "notfound",
              })
            } else {
              resolve({
                code: 204,
                message: "success",
              })
            }
          })
        } catch(e) {
          reject(e)
        }
      });
    },
    addToInventory: (parent, args, {auth}) => {
      return new Promise((resolve, reject) => {
        try {
          if(!auth.isAuthenticated) throwAuthError(reject);
          const { id, username } = args;
          User.updateOne({username}, { $addToSet: { items: [id]} }, (err, result) => {
            if(err) reject(err);
            if(result && result.modifiedCount === 0) {
              resolve({
                code: 204,
                message: "duplicate",
              })
            } else {
              resolve({
                code: 204,
                message: "success",
              })
            }
          })

        } catch(e) {
          reject(e);
        }
      })
    }
  }
};