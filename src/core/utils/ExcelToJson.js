const jsonfile = require('jsonfile');
const XLSX = require('xlsx');
const Role = require('../../model/roleModel');
const logger = require('../logger/appLogger');

const loadRolesFromExcel = async (excelpath) => {
  // // Remove old roles from database
  // try {
  //   Role.collection.deleteMany();
  //   logger.info(' all roles deleted as excel sheet is being loaded');
  // } catch (deleteError) {
  //   logger.error('There was an error, no new roles where added to the database');
  //   throw new Error(deleteError.message);
  // }

  const workbook = XLSX.readFile(excelpath);

  const sheetName = 'Detailed Demand Report';

  // Get New Roles Worksheet
  const worksheet = workbook.Sheets[sheetName];

  // Convert Excel Roles into JSON objects
  const initialJSONRoles = XLSX.utils.sheet_to_json(worksheet);

  const file = 'Open Roles/Transformed JSON/all-roles.json';

  for (let i = 0; i < initialJSONRoles.length; i += 1) {
    // Get necessary JSON values
    const initialJSONObject = initialJSONRoles[i];

    const requestNumber = initialJSONObject['Req. No'];
    const roleNumber = initialJSONObject['Role Number'];
    const projectName = initialJSONObject['Engagement Name'];
    const client = initialJSONObject['Lcl Clnt Name'];
    const roleName = initialJSONObject['Role Name'];
    const grade = initialJSONObject['Level Desc'];
    const startDate = initialJSONObject['Role Start Date'];
    const endDate = initialJSONObject['Role End Date'];
    const roleDescription = initialJSONObject['Role Description'];
    const location = initialJSONObject['Role Location'];
    const resourceManagerName = initialJSONObject['Engagement Manager'];
    const resourceManagerEmail = 'email@deloitte.co.uk';

    // Rename JSON attributes
    const transformedJSONObject = ({
      'Request Number': requestNumber,
      'Role Number': roleNumber,
      'Project Name': projectName,
      Client: client,
      'Role Name': roleName,
      Grade: grade,
      'Start Date': startDate,
      'End Date': endDate,
      'Role Description': roleDescription,
      Location: location,
      'Resource Manager Name': resourceManagerName,
      'Resource Manager Email': resourceManagerEmail,
    });

    // Add JSON object to JSON file
    jsonfile.writeFile(file, transformedJSONObject, {
      flag: 'a',
    }, (err) => {
      if (err) logger.error(err);
    });

    // Add new role to database
    Role.collection.insertOne(transformedJSONObject, (err) => {
      if (!err) {
        logger.info(`The role with the request-role number ${requestNumber}-${roleNumber} has been successfully added to the database`);
      } else {
        logger.error(`There was an error, the role with the request-role number ${requestNumber}-${roleNumber} wasn't added to the database`);
        logger.error(err);
      }
    });
  }
};

module.exports = loadRolesFromExcel;
