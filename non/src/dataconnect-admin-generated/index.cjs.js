const { validateAdminArgs } = require('firebase-admin/data-connect');

const connectorConfig = {
  connector: 'example',
  serviceId: 'siteparasorteio',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

function activeGiveaways(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ActiveGiveaways', undefined, inputOpts);
}
exports.activeGiveaways = activeGiveaways;

