import { AccessControl } from 'accesscontrol';
const controle = new AccessControl();

controle
    .grant('client')

    .readAny('user')
    .readAny('activity')
    .readAny('price')
    .readAny('description')
    .readAny('activityresult')

    .updateOwn('user')

controle
    .grant('employee')
    .extend('client')
    
    .updateOwn('description')
    .updateOwn('activityresult')

controle
    .grant('admin')
    .extend('client')

    .createAny('activity')
    .createAny('price')
    .createAny('description')
    .createAny('activityresult')

    .updateAny('activity')
    .updateAny('price')
    .updateAny('description')
    .updateAny('activityresult')

    .deleteAny('activity')
    .deleteAny('price')
    .deleteAny('description')
    .deleteAny('activityresult')

export default controle;