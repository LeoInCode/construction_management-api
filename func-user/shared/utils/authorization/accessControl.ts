import { AccessControl } from 'accesscontrol';
const controle = new AccessControl();

controle
    .grant('client')

    .readAny('user')
    .readAny('stage')
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

    .createAny('stage')
    .createAny('activity')
    .createAny('price')
    .createAny('description')
    .createAny('activityresult')

    .updateAny('stage')
    .updateAny('activity')
    .updateAny('price')
    .updateAny('description')
    .updateAny('activityresult')

    .deleteAny('stage')
    .deleteAny('activity')
    .deleteAny('price')
    .deleteAny('description')
    .deleteAny('activityresult')

export default controle;