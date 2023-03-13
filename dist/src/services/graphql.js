"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var graphql_compose_1 = require("graphql-compose");
var cart_repository_1 = require("../models/cart/cart.repository");
var products_repository_1 = require("../models/products/products.repository");
var user_repository_1 = require("../models/users/user.repository");
var DeleteResult = graphql_compose_1.schemaComposer.createObjectTC({
    name: "DeleteResult",
    fields: {
        acknowledged: "Boolean",
        deletedCount: "Int"
    }
});
graphql_compose_1.schemaComposer.Query.addFields(__assign(__assign(__assign({}, products_repository_1.productsQuerys), cart_repository_1.cartQuerys), user_repository_1.usersQuerys));
graphql_compose_1.schemaComposer.Mutation.addFields(__assign(__assign(__assign({}, products_repository_1.productsMutations), cart_repository_1.cartMutations), user_repository_1.usersMutations));
exports.schema = graphql_compose_1.schemaComposer.buildSchema();
