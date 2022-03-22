import pkg from "../package.json";

import importAsString from "@reactioncommerce/api-utils/importAsString.js";
import {myStartup} from './startup.js';

const mySchema = importAsString("./schema.graphql");

function myPublishProductToCatalog(catalogProduct, { context, product, shop, variants }) {
  catalogProduct.variants && catalogProduct.variants.map((catalogVariant) => {
    const productVariant = variants.find((variant) => variant._id === catalogVariant.variantId);
    catalogVariant.volume = productVariant.volume || null;
  });
 }

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */

 export default async function register(app) {
  await app.registerPlugin({
    label: "Product Volume",
    name: pkg.name,
    version: pkg.version,
    functionsByType: {
      startup: [myStartup],
      publishProductToCatalog: [myPublishProductToCatalog]
    },
    graphQL: {
      schemas: [mySchema]
    }
  });
}


