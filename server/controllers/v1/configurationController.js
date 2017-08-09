import configuration from '../../utilities/configuration';

export async function get(request, response) {
  const listOfConfigurationValues = {
    companyName: configuration.companyName,
  };

  return response.status(200).json(listOfConfigurationValues);
}

const configurationController = {
  get,
};

export default configurationController;
