/**
 * @fileoverview Report "this" being used in stateless functional components.
 */
'use strict';

const Components = require('../util/Components');

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const ERROR_MESSAGE = 'Stateless functional components should not use this';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Report "this" being used in stateless components',
      category: 'Possible Errors',
      recommended: false
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => ({
    MemberExpression(node) {
      const component = components.get(utils.getParentStatelessComponent());
      if (!component) {
        return;
      }
      if (node.object.type === 'ThisExpression') {
        context.report({
          node: node,
          message: ERROR_MESSAGE
        });
      }
    }
  }))
};
