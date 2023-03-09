import { schemaComposer } from 'graphql-compose';
import { cartMutations, cartQuerys } from '../models/cart/cart.repository';
import { productsQuerys, productsMutations } from '../models/products/products.repository';
import { usersMutations, usersQuerys } from '../models/users/user.repository';



const DeleteResult = schemaComposer.createObjectTC({
  name: "DeleteResult",
  fields: {
      acknowledged:"Boolean",
      deletedCount:"Int"
  }
});


schemaComposer.Query.addFields({
  ...productsQuerys,
  ...cartQuerys,
  ...usersQuerys
});

schemaComposer.Mutation.addFields({
 ...productsMutations,
 ...cartMutations,
 ...usersMutations
})

export const schema = schemaComposer.buildSchema()