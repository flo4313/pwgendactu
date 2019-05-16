'use strict'

const Department = use('App/Models/Department')

class DepartmentController {

    async allDepartment({response,session,params,view}){
        const departments = await Department.all();
        return response.json({
            departments : departments
        })
    }
}

module.exports = DepartmentController
